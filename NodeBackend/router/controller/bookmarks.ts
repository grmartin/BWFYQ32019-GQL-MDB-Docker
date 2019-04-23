import {NextFunction, Response} from "express";
import {StorageAwareRequest} from "../../data/middleware";
import {spreadable} from "../../utility/stuffjsshouldhave";
import * as _ from "lodash";

// This is server-side within Mongo and cant be defined here but we need the TSC
// compiler to nto error on it.
export declare function emit(x,y);

export default class BookmarksController {
    public static async getBookmarks(req: StorageAwareRequest, res: Response, next: NextFunction) {
        res.send(await req.dataManager.getBookmarks()).end();
    }

    public static async postBookmark(req: StorageAwareRequest, res: Response, next: NextFunction) {
        const posts = spreadable(req.body);

        const collection = req.dataManager.db.collection('bookmark');

        collection.insertMany([...posts])
            .then(() => res.send(posts).end());
    }

    public static async getTags(req: StorageAwareRequest, res: Response, next: NextFunction) {
        res.send(await req.dataManager.getTags()).end();
    }
}
