@echo off
setlocal

REM Runs the PowerShell version of the script.
set "SCRIPT_DIR=%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%new-challenge.ps1"

endlocal
