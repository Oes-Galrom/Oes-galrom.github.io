#!/bin/bash

# ask user for the branch to merge
read -p "enter the branch to merge into main: " BRANCH

# sanity check: does branch exist locally?
if ! git rev-parse --verify "$BRANCH" >/dev/null 2>&1; then
  echo "branch '$BRANCH' does not exist locally."
  exit 1
fi

echo "switching to main..."
git checkout main

echo "pulling latest from origin/main..."
git pull origin main

echo "merging $BRANCH into main..."
git merge "$BRANCH"

echo "pushing main to origin..."
git push origin main

echo "done. main now contains the changes from $BRANCH."

git checkout "$BRANCH"
