import {NextFunction, Response} from "express";
import {StorageAwareRequest} from "../../middleware/storage";
import {spreadable} from "../../utility/stuffjsshouldhave";

const collectionName = 'bookmark';

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
}
