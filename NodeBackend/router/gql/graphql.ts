import {StorageAwareRequest} from "../../data/middleware";
import {Map} from "../../utility/stufftsshouldhave";

const queries = {
    bookmarks: async (args:Map<any>, contextValue:StorageAwareRequest, info) =>
        await contextValue.dataManager.getBookmarks(),
    tags: async (args:Map<any>, contextValue:StorageAwareRequest, info) =>
        await contextValue.dataManager.getTags()
};

// noinspection JSUnusedGlobalSymbols
const mutations = {
    createBookmark: async (args:Map<any>, contextValue:StorageAwareRequest, info) => {
        const posts = [args];

        const collection = contextValue.dataManager.db.collection('bookmark');

        await collection.insertMany(posts);

        return args;
    }
};

export const root = {...queries, ...mutations};