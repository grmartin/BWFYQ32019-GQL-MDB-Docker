#!/bin/sh

# This script is host side and will basically wipe docker clean... use it at your own risk. (you may need to sudo if
# your docker socket is owned by a superuser)

# DEBUGGING
# set -x

echo Restoring Mongo Data

mongorestore --archive=/tmp/mdb/bookmarks.mongo_dump_archive
