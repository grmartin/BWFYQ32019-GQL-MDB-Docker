import * as core from 'express-serve-static-core';
import {Router} from 'express';
import {Middleware} from '../data/middleware';
import * as controller from './gql/middleware';
import * as graphqlHTTP from 'express-graphql';
import {initializeGQL} from "./gql/middleware";

const dbWrap = Middleware.wrap;
const router = Router();
router.use(initializeGQL);

router.use('/', dbWrap(async (req, res, next) => await graphqlHTTP(controller.config(req))(req, res)));

export default function bind (rtr: core.IRouter) { rtr.use('/gql', router); }