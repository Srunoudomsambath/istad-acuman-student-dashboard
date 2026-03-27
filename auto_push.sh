#!/bin/bash

# --- Configuration ---
FILE_NAME="auto_file.txt"      # Name of the file to create
COMMIT_MESSAGE="Auto update"   # Commit message

# --- Step 1: Create file if it doesn't exist ---
if [ ! -f "$FILE_NAME" ]; then
    echo "This is an auto-generated file." > $FILE_NAME
else
    echo "Updating $FILE_NAME"
    echo "Update at $(date)" >> $FILE_NAME
fi

# --- Step 2: Git add, commit, and push ---
git add $FILE_NAME
git commit -m "$COMMIT_MESSAGE"
git push personal srunoudomsambath   # Change 'main' to your branch if needed

echo "File $FILE_NAME pushed to GitHub successfully!"