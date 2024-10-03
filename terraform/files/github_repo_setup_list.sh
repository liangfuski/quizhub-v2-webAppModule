#!/usr/bin/env bash
set -o errexit; set -o pipefail; set -o nounset; set -e; set -x;

GITHUB_USER="${github_user}"
GITHUB_TOKEN="${github_token}"
GITHUB_REPO="${github_repo}"
GITHUB_FILE="${github_file}"
CNTREG_READER_U="${cntreg_reader_u}"
CNTREG_READER_P="${cntreg_reader_p}"
GITHUB_REPO_USER="${github_repo_user}"

if [ ! -d "$GITHUB_REPO" ] 
then
    echo "Directory $GITHUB_REPO DOES NOT exists. CLONING..." 
    git clone "https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_REPO_USER/$GITHUB_REPO.git"
fi

cd $GITHUB_REPO

git checkout refactor/docker-container-v2

. ./$GITHUB_FILE
