#!/bin/sh
# We try to use the same Node.js (LTS) and NPM versions for all TypeScript ShapeDiver projects.
target_node_version="v14" # FIXME upgrade to 'v18' as soon as rhino3dm get their shit together
target_npm_version="6"    # FIXME upgrade to '8' as soon as rhino3dm get their shit together

node_version=$(node -v | cut -d. -f1)
npm_version=$(npm -v | cut -d. -f1)

# Check Node.js
if [ "${node_version}" != "${target_node_version}" ]; then
  echo "Invalid Node.js version: Detected major version ${node_version} but requires ${target_node_version}." >&2
  exit 1
fi

# Check NPM
if [ "${npm_version}" != "${target_npm_version}" ]; then
  echo "Invalid NPM version: Detected major version ${npm_version} but requires version ${target_npm_version}." >&2
  exit 1
fi
