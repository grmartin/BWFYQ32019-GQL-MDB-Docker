import {StorageAwareRequest} from "../../middleware/storage";
import {collectionName as bookmarkCollectionName} from "../controller/bookmarks";
import * as _ from 'lodash';

type basicMap<T> = { [index:string] : T };

// This is server-side within Mongo and cant be defined here but we need the TSC
// compiler to nto error on it.
declare function emit(x,y);

export const root = {
    hello: () => 'Hello world!',
    bookmarks: async (args:basicMap<any>, contextValue:StorageAwareRequest, info) =>
        await contextValue.mongoDatabase.collection(bookmarkCollectionName).find().toArray(),
    tags: async (args:basicMap<any>, contextValue:StorageAwareRequest, info) =>
        (await contextValue.mongoDatabase.collection(bookmarkCollectionName)
            .mapReduce(
                function () { this.tags.forEach((x) => emit(x, null)) },
                _.noop,
                { out: {inline: 1} }
            )
        ).map((x)=>x._id)
};