import {NextFunction, Response} from "express";
import {StorageAwareRequest} from "../../middleware/storage";
import {spreadable} from "../../utility/stuffjsshouldhave";
import * as _ from "lodash";

export const collectionName = 'bookmark';
// This is server-side within Mongo and cant be defined here but we need the TSC
// compiler to nto error on it.
export declare function emit(x,y);

export default class BookmarksController {
    public static async getBookmarks(req: StorageAwareRequest, res: Response, next: NextFunction) {
        const items = await req.mongoDatabase.collection(collectionName).find().toArray();
        res.send(items).end();
    }

    public static async postBookmark(req: StorageAwareRequest, res: Response, next: NextFunction) {
        const posts = spreadable(req.body);

        const collection = req.mongoDatabase.collection(collectionName);

        collection.insertMany([...posts])
            .then(() => res.send(posts).end());
    }
    public static async getTags(req: StorageAwareRequest, res: Response, next: NextFunction) {
        res.send(
            (await req.mongoDatabase.collection(collectionName)
                .mapReduce(
                    function () { this.tags.forEach((x) => emit(x, null)) },
                    _.noop,
                    { out: {inline: 1} }
                ))
            .map((x)=>x._id)
        ).end();
    }
}
