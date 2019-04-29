/* Whilst i would normally break this out in to Router and Controller... these are quick debug pieces and i don't
   see the point. */

import {ulid} from 'ulid';
import * as core from 'express-serve-static-core';
import {Router} from 'express';
import {Middleware} from '../data/middleware';
import * as path from "path";
import * as fs from "fs";

const router = Router();

const debugKey = process.env.NBE_DEBUG_KEY || ulid();
const debugEndpoint = `/*${debugKey}/`;

console.log('Debugging routes are available via the base path: ', `/rest${debugEndpoint}`);

const getFileData = (rootRelPath: string): string => {
    try {
        return fs.readFileSync(path.join(__dirname, '..', rootRelPath), 'utf-8');
    } catch {
        return '<FNF>';
    }
};

router.get('/ping', (req, res) => res.send({'pong': new Date().getTime() / 1000}).end());
router.get('/test_connection', Middleware.wrap((req, res) => res.send({name: req.dataManager.db.databaseName}).end()));
router.get('/rti', (req, res) => res.send({
    'build_env': getFileData('.build_env'),
    'proc_env': process.env,
    'argv': process.argv,
    'id': getFileData('.install_id')
}).end());

export default function bind (rtr: core.IRouter) { rtr.use(debugEndpoint, router); }