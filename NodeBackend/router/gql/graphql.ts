import {StorageAwareRequest} from "../../data/middleware";

type basicMap<T> = { [index:string] : T };


export const root = {
    hello: () => 'Hello world!',
    bookmarks: async (args:basicMap<any>, contextValue:StorageAwareRequest, info) =>
        await contextValue.dataManager.getBookmarks(),
    tags: async (args:basicMap<any>, contextValue:StorageAwareRequest, info) =>
        await contextValue.dataManager.getTags()
};