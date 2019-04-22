import {StorageAwareRequest} from "../../middleware/storage";
import {collectionName as bookmarkCollectionName} from "../controller/bookmarks";

type basicMap<T> = { [index:string] : T };

export const root = {
    hello: (args:basicMap<any>, contextValue:StorageAwareRequest, info) => {
        return 'Hello world!';
    },
   bookmarks: async (args:basicMap<any>, contextValue:StorageAwareRequest, info) =>
       await contextValue.mongoDatabase.collection(bookmarkCollectionName).find().toArray()
};