#!/usr/bin/env bash

. "${BASH_SOURCE%/*}/../env.sh"

pushd "${BASH_SOURCE%/*}"
ipp mongo_node_gql.agc json_pp -f json -t json -json_opt pretty,utf8
popd
