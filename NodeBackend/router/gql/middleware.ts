import * as graphqlHTTP from 'express-graphql';
import {buildSchema} from "graphql";
import {readFileSync} from "fs";
import * as path from "path";
import {NextFunction, Request, Response} from 'express';
import * as controller from './graphql';

/* GQL is a special case in terms of middleware so lets keep it as a 'router' that has some middleware. */

const FILE_ULID = '01D8W8FSA7TC547DTRZG514AEM';
const GQL_SCHEMA = `${FILE_ULID}:GQL_SCHEMA`;
const SCHEMA_FILE = './schema.graphql';

export function initializeGQL(req: Request, res: Response, next:NextFunction) {
    if (req.app.get(GQL_SCHEMA) != null) {
        return next();
    }
    try {
        req.app.set(GQL_SCHEMA, buildSchema(readFileSync(path.join(__dirname, SCHEMA_FILE), {encoding: 'utf-8'})));
        return next();
    } catch (e) {
        return next(e);
    }
}

// noinspection SpellCheckingInspection
export const config = (req:Request) => (<graphqlHTTP.Options>{
    graphiql: process.env.NBE_GQL_UI === "1",
    schema: req.app.get(GQL_SCHEMA),
    rootValue: controller.root
});