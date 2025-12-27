<#
Creates the next ChallengeN (or ChalengeN) folder under this directory.
Usage:
  .\new-challenge.ps1
#>

$ErrorActionPreference = 'Stop'

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $rootDir

$maxN = 0
$chosenPrefix = 'Challenge'

Get-ChildItem -Directory | ForEach-Object {
    $name = $_.Name
    if ($name -match '^(Challenge|Chalenge)(\d+)$') {
        $prefix = $Matches[1]
        $n = [int]$Matches[2]
        if ($n -gt $maxN) {
            $maxN = $n
            $chosenPrefix = $prefix
        }
    }
}

$nextN = $maxN + 1
$folder = "$chosenPrefix$nextN"
$mdFile = "$chosenPrefix$nextN.md"
$javaFile = "HR$nextN.java"

if (Test-Path -LiteralPath $folder) {
    throw "Refusing to overwrite existing path: $folder"
}

New-Item -ItemType Directory -Path $folder | Out-Null

@"
# $chosenPrefix$nextN

## Problem

## Notes

## Solution

"@ | Set-Content -Encoding UTF8 -Path (Join-Path $folder $mdFile)

@"
public class HR$nextN {
    public static void main(String[] args) {
        // TODO: implement
    }
}
"@ | Set-Content -Encoding UTF8 -Path (Join-Path $folder $javaFile)

Write-Host "Created: $folder/"
Write-Host "- $mdFile"
Write-Host "- $javaFile"
