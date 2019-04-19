import * as core from 'express-serve-static-core';
import {Router} from 'express';
import {Storage} from '../middleware/storage';
import controller from './controller/bookmarks';

const dbWrap = Storage.wrap;

const router = Router();

router.get('/', dbWrap(controller.getBookmarks));
router.post('/', dbWrap(controller.postBookmark));

export default function bind (rtr: core.IRouter) { rtr.use('/bookmarks', router); }