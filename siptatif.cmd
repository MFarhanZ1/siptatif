@REM inspired by https://github.com/deaaprizal/cuymodoro

@REM running all app level instance
@REM run app.cmd in your windows terminal
@REM [app.cmd start] - starting new app instance fe & be 
@REM [app.cmd stop]  - stoping all app instance 
@REM [app.cmd install]  - install all required packages 

@echo off

set COMMAND=%1

if "%COMMAND%"=="start" (
    echo Starting the npm project...
    cd backends
    start "" npm run dev
    cd ../frontends
    start "" bun run dev
    start "" chrome http://localhost:5173/
    echo check another terminal window please...
) else if "%COMMAND%"=="stop" (
    echo Stopping all running instance...
    taskkill /f /im node.exe > nul 2>&1
) else if "%COMMAND%"=="install" (
    echo Preparing to install siptatif dependencies...
    cd backends
    start "" npm install -y
    cd ../frontends
    start "" bun install -y
) else (
    echo Invalid COMMAND. Please provide either "start", "install" or "stop".
)