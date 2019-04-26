#!/usr/bin/env sh

mongorestore \
 --host localhost \
 --archive=/tmp/mdb/bookmarks.mongo_dump_archive
