#!/usr/bin/env bash

mongoimport \
 --host localhost \
 --db bookmarks \
 --collection bookmark \
 --type json \
 --file /tmp/some-bookmarks.json \
 --jsonArray