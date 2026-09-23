#!/bin/bash

set -euo pipefail

if command -v gsed &> /dev/null; then
    SED_CMD="gsed"
elif sed --version 2>&1 | grep -q "GNU"; then
    SED_CMD="sed"
else
    echo "Error: GNU sed is required. Install it with: brew install gnu-sed"
    exit 1
fi

HARD_MODE=false

if [ $# -ge 1 ] && [ "$1" = "--hard" ]; then
    HARD_MODE=true
    shift
fi

if [ $# -ne 2 ] || [[ ! "$1" =~ ^[a-zA-Z0-9_-]+$ ]] || [[ ! "$2" =~ ^[a-zA-Z0-9][a-zA-Z0-9_-]*$ ]]; then
    echo "Usage: $0 [--hard] <organization/username> <package-name>"
    exit 1
fi

ORG="$1"
PKG="$2"
SCRIPT_NAME=$(basename "$0")
cd "$(dirname "$0")"

# Only replace template text; leave .git, node_modules, bun.lock and dist alone.
for file in package.json README.md app/index.html scripts/build.ts renovate.json; do
    "$SED_CMD" -i \
        -e "s|acidghost|$ORG|g" \
        -e "s|bun-web-start|$PKG|g" \
        "$file"
done

echo "Replaced 'acidghost' with '$ORG' and 'bun-web-start' with '$PKG' in template files"

if [ "$HARD_MODE" = true ]; then
    cat > README.md << EOF
# $PKG

<!-- TODO -->

## Installation

<!-- TODO -->

## Usage

<!-- TODO -->
EOF

    echo "Updated README.md for package '$PKG'"

    rm UNLICENSE
    echo "Removed UNLICENSE"

    rm "$SCRIPT_NAME"
    echo "Removed $SCRIPT_NAME"
else
    echo "You should now update README.md and delete UNLICENSE and $SCRIPT_NAME"
fi
