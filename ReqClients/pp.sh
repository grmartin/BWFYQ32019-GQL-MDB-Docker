#!/usr/bin/env bash

. "${BASH_SOURCE%/*}/../env.sh"

pushd "${BASH_SOURCE%/*}"
ipp mongo_node_gql.agc jsonlint --pretty-print --sort-keys 
popd
