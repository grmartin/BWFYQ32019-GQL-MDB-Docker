import * as mongodb from 'mongodb';
import {Request, Response, NextFunction, RequestHandler} from 'express';
import * as _ from 'lodash';
import {spreadPair} from "../utility/predicatehelpers";
import {toIndexSymbol} from "../utility/stufftsshouldhave";
import {DataManager} from "./dataManager";

/*
 * This file provides two methodologies for accessing the MongoDB instance, a modified Request instance with a property
 * for simple access in places where we can control the Request object, and a `get` utility method for places where we
 * cant.
 *
 * Basically this breaks down to:
 *  super nice access for REST apis: `StorageAwareRequest.mongoDatabase`
 *  a utility getter for GQL: `Middleware.getMongoDatabase(req)`
 */

export interface StorageAwareRequest extends Request {
    dataManager: DataManager;
}

const FILE_ULID = '01D8VHT5T6TKR72NXNVBVN139C';
const DATABASE_KEY = toIndexSymbol(Symbol(`${FILE_ULID}:db`));
const DB_SETUP_CHECK_RUN = `${FILE_ULID}:DB_SETUP_CHECK_RUN`;
const DB_URL = process.env.NBE_DB_URL || 'mongodb://localhost:27017';

type expressFn = (req: StorageAwareRequest, res: Response, next: NextFunction)=>void;

const collections = {
    bookmark: {
        create: {
            validator: {
                $jsonSchema: {
                    //"$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "Single Bookmark Entry",
                    "description": "",
                    "type": "object",
                    "properties": {
                        "title": {"type": "string"},
                        "url": {
                            "type": "string",
                            "pattern": "^([a-zA-Z][a-zA-Z0-9+.-]*):(?:\\/\\/((?:(?=((?:[a-zA-Z0-9-._~!$&'()*+,;=:]|%[0-9a-fA-F]{2})*))(\\3)@)?(?=((?:\\[?(?:::[a-fA-F0-9]+(?::[a-fA-F0-9]+)?|(?:[a-fA-F0-9]+:)+(?::[a-fA-F0-9]+)+|(?:[a-fA-F0-9]+:)+(?::|(?:[a-fA-F0-9]+:?)*))\\]?)|(?:[a-zA-Z0-9-._~!$&'()*+,;=]|%[0-9a-fA-F]{2})*))\\5(?::(?=(\\d*))\\6)?)(\\/(?=((?:[a-zA-Z0-9-._~!$&'()*+,;=:@\\/]|%[0-9a-fA-F]{2})*))\\8)?|(\\/?(?!\\/)(?=((?:[a-zA-Z0-9-._~!$&'()*+,;=:@\\/]|%[0-9a-fA-F]{2})*))\\10)?)(?:\\?(?=((?:[a-zA-Z0-9-._~!$&'()*+,;=:@\\/?]|%[0-9a-fA-F]{2})*))\\11)?(?:#(?=((?:[a-zA-Z0-9-._~!$&'()*+,;=:@\\/?]|%[0-9a-fA-F]{2})*))\\12)?$"
                        },
                        "notes": {"type": "string"},
                        "tags": {
                            "type": "array",
                            "items": {"type": "string"}
                        },
                        "image": {"type": "string", "pattern": "[^-A-Za-z0-9+/=]|=[^=]|={3,}$"}
                    }
                }
            }
        },
        indices: [
            {
                unique: true,
                name: 'IDX_UNIQ_URL',
                fieldOrSpec: 'url'
            }
        ]
    }
};

export class Middleware {
    public static wrap(fn: expressFn): RequestHandler {
        return function _storage_wrap(req: Request, res: Response, next: NextFunction) {
            Object.defineProperty(req, 'dataManager', {
                enumerable: false,
                get: () => req[DATABASE_KEY]
            });

            fn(<StorageAwareRequest>req, res, next);
        }
    }

    public static connect(database: string, url: string = DB_URL): RequestHandler  {
        return function _storage_Connect(req: Request, res: Response, next: NextFunction) {
            const client = new mongodb.MongoClient(url, { useNewUrlParser: true } );

            client.connect(function __mongoDb_connect(err: mongodb.MongoError) {
                if (err !== null) {
                    return next(err);
                }

                const db = client.db(database);

                function setAndNext() {
                    req.app.set(DB_SETUP_CHECK_RUN, true);

                    req[DATABASE_KEY] = new DataManager(db);

                    res.on("close", () => {client.close().then()});

                    next();
                }

                if (req.app.get(DB_SETUP_CHECK_RUN) !== true) {
                    console.debug("Validating data collections...");
                    db.listCollections(undefined, {nameOnly: true})
                        .toArray()
                        .then((collObjs) => collObjs.map((x) => x.name))
                        .then(Middleware.initializeCollections(db))
                        .then(setAndNext);
                } else {
                    setAndNext();
                }
            });
        }
    }

    static initializeCollections(db: mongodb.Db): (existingCollections:string[])=>Promise<string[]> {
        return async (existing: string[]) => {
            console.debug("Collections found: ", existing);

            const create =
                _.chain(collections)
                    .toPairs()
                    .filter(spreadPair((v, k) => existing.indexOf(k) === -1))
                    .fromPairs()
                    .value();

            console.debug("Collections to define: ", _.keys(create));

            await Promise.resolve(_.toPairs(create).map(async (kvp) => {
                await db.createCollection(kvp[0], kvp[1].create);

                // TODO: Search and selectively create indices
                for (const idx of kvp[1].indices) {
                    const { fieldOrSpec: spec, ...options } = idx;
                    await db.createIndex(kvp[0], spec, options);
                }
            }));

            return _.keys(create);
        };
    }
}
