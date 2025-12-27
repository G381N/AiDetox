#!/usr/bin/env bash
set -euo pipefail

# Creates the next ChallengeN (or ChalengeN) folder under this directory.
# Linux/macOS:
#   ./new-challenge.sh
# Windows:
#   - Git Bash / MSYS2: bash ./new-challenge.sh
#   - CMD wrapper:      new-challenge.cmd

# Avoid depending on external coreutils (dirname/mkdir/cat) so the script can
# run in limited Windows bash environments.

script_path="${BASH_SOURCE[0]}"
script_dir="${script_path%/*}"
if [[ "$script_dir" == "$script_path" ]]; then
  script_dir="."
fi

cd "$script_dir"

max_n=0
chosen_prefix="Challenge"

shopt -s nullglob
for d in */ ; do
  name="${d%/}"
  if [[ "$name" =~ ^(Challenge|Chalenge)([0-9]+)$ ]]; then
    prefix="${BASH_REMATCH[1]}"
    n="${BASH_REMATCH[2]}"
    if (( n > max_n )); then
      max_n=$n
      chosen_prefix="$prefix"
    fi
  fi
 done
shopt -u nullglob

next_n=$((max_n + 1))
folder="${chosen_prefix}${next_n}"
md_file="${chosen_prefix}${next_n}.md"
java_file="HR${next_n}.java"

if [[ -e "$folder" ]]; then
  echo "Refusing to overwrite existing path: $folder" >&2
  exit 1
fi

mk_dir() {
  local path="$1"
  if command -v mkdir >/dev/null 2>&1; then
    mkdir -p "$path"
    return
  fi
  if command -v cmd.exe >/dev/null 2>&1; then
    # cmd.exe mkdir creates intermediate directories by default.
    cmd.exe /c "mkdir \"$path\"" >/dev/null
    return
  fi
  echo "No directory creation command available (mkdir/cmd.exe)." >&2
  exit 1
}

write_file() {
  local path="$1"
  shift
  # Print remaining args as a single string.
  printf '%s' "$*" >"$path"
}

mk_dir "$folder"

write_file "$folder/$md_file" "# ${chosen_prefix}${next_n}

## Problem

## Notes

## Solution
"

write_file "$folder/$java_file" "public class HR${next_n} {
    public static void main(String[] args) {
        // TODO: implement
    }
}
"

echo "Created: $folder/"
echo "- $md_file"
echo "- $java_file"
