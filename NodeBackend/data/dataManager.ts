import {Db} from "mongodb";
import * as _ from "lodash";
import {BasicObject} from "../utility/stufftsshouldhave";
import {spreadable} from "../utility/stuffjsshouldhave";

const bookmarkCollectionName = 'bookmark';

// This is server-side within Mongo and cant be defined here but we need the TSC
// compiler to nto error on it.
declare function emit(x,y);

export class DataManager {
    public db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    public async getBookmarks(): Promise<BasicObject[]> {
        return await this.db.collection(bookmarkCollectionName).find().toArray()
    }

    public async addBookmarks(bookmarks: BasicObject | BasicObject[]): Promise<BasicObject | BasicObject[]> {
        const posts = spreadable(bookmarks);

        await this.db.collection(bookmarkCollectionName).insertMany([...posts])

        return bookmarks;
    }

    public async getTags(): Promise<string[]> {
        return (await this.db.collection(bookmarkCollectionName)
                .mapReduce(
                    function _getTags_reducer() { this.tags.forEach((x) => emit(x, null)) },
                    _.noop,
                    { out: {inline: 1} }
                )
        ).map((x)=>x._id)
    }
}