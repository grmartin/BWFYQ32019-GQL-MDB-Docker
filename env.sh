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

export BWFY2019Q3_HOME=$HOME
export BWFY2019Q3_BASE_PATH=$PATH
export BWFY2019Q3_TOOL_PATH=$BWFY2019Q3_ROOT_DIR

function ipp {
    local tmp=$(mktemp)
    local file="$1"
    shift
    $* < "$file" > "$tmp"
    mv "$tmp" "$file"
}

export -f ipp
