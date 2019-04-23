import * as core from 'express-serve-static-core';
import {Router} from 'express';
import {Middleware} from '../data/middleware';
import controller from './controller/bookmarks';

const dbWrap = Middleware.wrap;

const router = Router();

router.get('/', dbWrap(controller.getBookmarks));
router.post('/', dbWrap(controller.postBookmark));
router.get('/tags', dbWrap(controller.getTags));

export default function bind (rtr: core.IRouter) { rtr.use('/bookmarks', router); }