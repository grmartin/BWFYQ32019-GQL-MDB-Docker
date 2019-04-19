#!/usr/bin/env bash
mongoexport -d bookmarks -c bookmark --jsonArray --pretty
