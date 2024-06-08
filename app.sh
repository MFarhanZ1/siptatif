#!/bin/bash
# for unix environtment
# use git bash if you are using windows operating system
# [app.sh start] - starting new app instance fe & be 
# [app.sh stop]  - stoping all app instance 
# [app.sh install]  - install all required packages 

COMMAND=$1

if [ "$COMMAND" = "start" ]; then
    echo "Starting the npm project..."
    cd backends
    start "" npm run dev
    cd ../frontends
    start "" bun run dev
    start "" chrome http://localhost:5173/
    echo "check another terminal window please..."
elif [ "$COMMAND" = "stop" ]; then
    echo "Stopping all running instance..."
    pkill -f "node"
elif [ "$COMMAND" = "install" ]; then
    echo "preparing siptatif project..."
    cd backends
    start "" npm install -y
    cd ../frontends
    start "" bun install -y
else
    echo "Invalid COMMAND. Please provide either 'start' or 'stop'."
fi