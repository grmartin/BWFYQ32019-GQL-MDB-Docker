import {Middleware as DataStorageMiddleware, StorageAwareRequest} from "./data/middleware";
import {RequestHandler} from "express";
import {EventEmitter} from "events";
import {InsertWriteOpResult} from "mongodb";
import * as fs from "fs";
import * as _ from "lodash";

// TODO: These are quick hacks to make things work with our 'pure' Express Middleware implementaion. Abstract Later.
class FalseRequest extends EventEmitter {
    app = {get: () => false, set: () => undefined}
}

const doInOrder = (...fns: any) => (x?: any) => fns.forEach(fn => fn(x));

const doNext = (hdnr: RequestHandler, req?: StorageAwareRequest) =>
    new Promise((p, f) => {
        let falseRequest = <any>(req || new FalseRequest());

        // const emit = () => falseRequest.emit('close', undefined);
        //
        // const p = doInOrder(rawP, emit);
        // const f = doInOrder(rawF, emit);

        hdnr(falseRequest, falseRequest, (x) => {
            x === undefined ? p(falseRequest) : f(x)
        });
    });

const file = process.argv[process.argv.length-1];

if (!file.match(/\.json$/)) {
    console.error('Invalid file specified.');
    process.exit(1);
}

const rawJsonObjs = JSON.parse(fs.readFileSync(file, 'utf8'));

const jsonData = _.chain(rawJsonObjs).map((x)=>_.omit(x, '_id')).value()

doNext(DataStorageMiddleware.connect('bookmarks'))
    .then((req: StorageAwareRequest) =>
        new Promise((p) => doNext(DataStorageMiddleware.wrap((_1, _2, next) => doInOrder(() => p(req), next)()), req)))
    .then((req: StorageAwareRequest) =>
        req.dataManager.db.collection('bookmark').insertMany(jsonData)
            .then((mongoResult) => {
                req.emit('close');
                return mongoResult;
            }))
    .then((result: InsertWriteOpResult) => {
        console.log("result=>", result);
    })
    .catch((e) => console.error("Processing Error:", e));