/* Whilst i would normally break this out in to Router and Controller... these are quick debug pieces and i don't
   see the point. */

import {ulid} from 'ulid';
import * as core from 'express-serve-static-core';
import {Router} from 'express';
import {Middleware} from '../data/middleware';

const router = Router();

const debugKey = process.env.NBE_DEBUG_KEY || ulid();
const debugEndpoint = `/*${debugKey}/`;

console.log('Debugging routes are available via the base path: ', `/rest${debugEndpoint}`);

router.get('/ping', (req, res) => res.send({'pong': new Date().getTime() / 1000}).end());
router.get('/test_connection', Middleware.wrap((req, res) => res.send({name: req.dataManager.db.databaseName}).end()));

export default function bind (rtr: core.IRouter) { rtr.use(debugEndpoint, router); }