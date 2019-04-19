#!/usr/bin/env bash

if [ -z ${BWFY2019Q3_ROOT_ENV_SOURCE+x} ]
then
	# Get script location, resolve if a link.
	export BWFY2019Q3_ROOT_ENV_SOURCE="${BASH_SOURCE[0]}"
	while [ -h "$BWFY2019Q3_ROOT_ENV_SOURCE" ]; do
	  export BWFY2019Q3_ROOT_DIR="$( cd -P "$( dirname "$BWFY2019Q3_ROOT_ENV_SOURCE" )" && pwd )"
	  export BWFY2019Q3_ROOT_ENV_SOURCE="$(readlink "$BWFY2019Q3_ROOT_ENV_SOURCE")"
	  [[ ${BWFY2019Q3_ROOT_ENV_SOURCE} != /* ]] && BWFY2019Q3_ROOT_ENV_SOURCE="$BWFY2019Q3_ROOT_DIR/$BWFY2019Q3_ROOT_ENV_SOURCE"
	done
	export BWFY2019Q3_ROOT_DIR="$( cd -P "$( dirname "$BWFY2019Q3_ROOT_ENV_SOURCE" )" && pwd )"
fi

pushd "$BWFY2019Q3_ROOT_DIR"

[ ! -d "Data" ] && mkdir Data
[ ! -d "Log" ] && mkdir Log

mongod \
	--dbpath `pwd`/Data \
	--logpath `pwd`/Log/rtl.log \
	--directoryperdb --fork > runtime_info.txt

popd
