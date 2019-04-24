import {NextFunction, Response} from "express";
import {StorageAwareRequest} from "../../data/middleware";

export default class BookmarksController {
    public static async getBookmarks(req: StorageAwareRequest, res: Response, next: NextFunction) {
        res.send(await req.dataManager.getBookmarks()).end();
    }

    public static async postBookmark(req: StorageAwareRequest, res: Response, next: NextFunction) {
        res.send(await req.dataManager.addBookmarks(req.body)).end();
    }

    public static async getTags(req: StorageAwareRequest, res: Response, next: NextFunction) {
        res.send(await req.dataManager.getTags()).end();
    }
}
