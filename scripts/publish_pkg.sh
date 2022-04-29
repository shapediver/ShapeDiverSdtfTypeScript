#!/usr/bin/env bash
set -o pipefail
set -o nounset

# We want all sdTF SDK packages and libraries to share the same version.
# This script builds and publishes all parts of the SDK for a new given version.
#
# Before the publishing step, all components are built and tested to make sure that the latest version is in a
# publishable state.
# Additionally, the version in the package.json files is updated to the specified version and the changes are committed
# to the local git workspace (NO push!).
# After this step, the script waits for user input to allow a manual check before the publishing process starts.
#
# Publishing:
# First, the package is published into the GitHub repository.
# It is assumed, that a `.npmrc`-file exists with the respective credentials.
# Second, the package is published into the ShapeDiver NPM registry for public access.
# It is assumed, that the user has already logged in to NPM before this script executed.
#
# If the input version is invalid or any of the previously mentioned assumptions are not met, a meaningful error is
# returned by the script before anything is published.
#
# Usage:
#   ./publish_pkg.sh <version to publish>

# Colorizing shell
red=$(tput setaf 1)
green=$(tput setaf 2)
magenta=$(tput setaf 5)
bold=$(tput bold)
nc=$(tput sgr0)

# Constants
pkg_file="package.json"
pkg_file_bak="${pkg_file}.bak"
rc_file=".npmrc"
rc_file_bak="${rc_file}.bak"
npm_registry="https://registry.npmjs.org/"

cleanup() {
  [ -f ${pkg_file_bak} ] && mv -f "${pkg_file_bak}" "${pkg_file}"

  if [ -L ${rc_file_bak} ]; then
    cp_symlink "${rc_file_bak}" "${rc_file}"
    rm "${rc_file_bak}"
  elif [ -f "${rc_file_bak}" ]; then
    mv "${rc_file_bak}" "${rc_file}"
  fi
}
trap 'cleanup' EXIT

cp_symlink() {
  symlink="$(stat --printf="%N\n" "${1}" | sed -En "s/.*'(.*)'$/\1/p")"
  ln -s "${symlink}" "${2}"
}

## Validate that a version has been specified
[ $# -lt 1 ] && echo "${red}Error${nc}: Specify the new version of the sdTF SDK components." >&2 && exit 1
version="${1:-}"

# Validate that the given version consists of 3 parts, separated by a dot
RX='^([0-9]+\.){2}(\*|[0-9]+)(-.*)?$'
[[ ! $version =~ $RX ]] && echo "${red}Error${nc}: The given version is invalid." >&2 && exit 1

# Validate that NPM login has already been done
npm whoami --registry "${npm_registry}" &> /dev/null
[ ${?} -gt 0 ] && echo "${red}Error${nc}: You are not logged in to your NPM account. Run ${green}npm login --registry ${npm_registry}${green} and log in with your ShapeDiver account!" >&2 && exit 1

# Define paths of all sdTF SDK components that should be processed
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
components=(
  "${__dir}/../libs/sdk.sdtf-core"
  "${__dir}/../libs/sdk.sdtf-primitives"
  "${__dir}/../libs/sdk.sdtf-geometry"
  "${__dir}/../libs/sdk.sdtf-rhino3dm"
  "${__dir}/../packages/sdk.sdtf-v1"
)

################################################################################
# Prepare components for publishing.
#
# Build & test code, update versions and commit in git.
################################################################################
for path in "${components[@]}"; do
  # Validate that the input is a director
  [ ! -d "${path}" ] && echo "${red}Error${nc}: The component path '${path}' is not a directory." >&2 && exit 1

  # Validate that the given directory contains a package.json file
  [ ! -f "${path}/package.json" ] && echo "${red}Error${nc}: The given directory does not contain a package.json file." >&2 && exit 1

  # Build and test
  npm run build --prefix "${path}"
  npm run test --prefix "${path}"

  # Update the component versions and add content to git
  sed -i "s/\"version\": \".*\"/\"version\": \"${version}\"/" "${path}/${pkg_file}"
  sed -i "s/\"@shapediver\/sdk.sdtf-core\": \".*\"/\"@shapediver\/sdk.sdtf-core\": \"^${version}\"/g" "${path}/${pkg_file}"
  sed -i "s/\"@shapediver\/sdk.sdtf-primitives\": \".*\"/\"@shapediver\/sdk.sdtf-primitives\": \"^${version}\"/g" "${path}/${pkg_file}"
  sed -i "s/\"@shapediver\/sdk.sdtf-geometry\": \".*\"/\"@shapediver\/sdk.sdtf-geometry\": \"^${version}\"/g" "${path}/${pkg_file}"
  sed -i "s/\"@shapediver\/sdk.sdtf-rhino3dm\": \".*\"/\"@shapediver\/sdk.sdtf-rhino3dm\": \"^${version}\"/g" "${path}/${pkg_file}"
  sed -i "s/\"@shapediver\/sdk.sdtf-v1\": \".*\"/\"@shapediver\/sdk.sdtf-v1\": \"^${version}\"/g" "${path}/${pkg_file}"

  git add "${path}/${pkg_file}"
done

# Commit version updates
git commit -m "Publish version ${version}"

echo ""
echo "${bold}${green}SUCCESS${nc}: All components are ready for being published."
echo "${bold}${magenta}NOTE${nc}: The versions have been updated and committed to git - ${bold}please ensure that everything is correct and push the commit manually!${nc}"
echo ""
read -p "Press [key] to publish to the Github registry ..."

################################################################################
# Publish to private Github registry.
#
# Credentials and the registry endpoint are defined via a .npmrc-file.
################################################################################
for path in "${components[@]}"; do
  pushd "${path}" || exit 1

  # Backup package.json file
  [ -f ${pkg_file_bak} ] && echo "${red}Error${nc}: Could not backup file '${pkg_file}' - file '${pkg_file_bak}' already exists." >&2 && exit 1
  cp ${pkg_file} ${pkg_file_bak}

  # Backup .npmrc file - special treatment since this might be a symlink
  [ -f ${rc_file_bak} ] && echo "${red}Error${nc}: Could not backup file '${rc_file}' - file '${rc_file_bak}' already exists." >&2 && exit 1
  if [ -L ${rc_file} ]; then
    cp_symlink "${rc_file}" "${rc_file_bak}"
  elif [ -f "${rc_file_bak}" ]; then
    cp ${rc_file} ${rc_file_bak}
  fi

  # Publish
  npm publish

  popd || exit 1
done

echo ""
echo "${bold}${green}SUCCESS${nc}: All components have been published to our private ShapeDiver Github registry."
echo ""
read -p "Press [key] to publish to the NPM registry ..."

################################################################################
# Publish to public NPM registry
#
# Credentials are provided via `npm login` (must be done prior to this script)
# and the registry endpoint is specified via CLI.
# Therefore, all other publish-configs must be removed temporarily.
################################################################################
for path in "${components[@]}"; do
  pushd "${path}" || exit 1

  # Remove .npmrc-config file
  rm "${rc_file}"

  # Remove the property "publishConfig" from package.json
  node -pe "
  json = JSON.parse(process.argv[1])
  delete json.publishConfig
  JSON.stringify(json, null, 2)
  " "$(cat "${pkg_file}")" > "${pkg_file}"

  npm publish \
    --scope @shapediver \
    --access public \
    --registry "${npm_registry}"

  popd || exit 1
done

