#!/bin/bash

# Ensure Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Ensure .NET SDK is installed
if ! command -v dotnet &> /dev/null
then
    echo ".NET SDK is not installed. Please install .NET SDK from https://dotnet.microsoft.com/download"
    exit 1
fi

# Navigate to the backend directory and start the backend
echo "Starting backend..."
cd backend/TaskListAPI/TaskListAPI
dotnet run &

# Navigate back to the root directory
cd ../../..

# Navigate to the frontend directory and start the frontend
echo "Starting frontend..."
cd frontend/task-list-app
npm install
npm start &

# Function to stop processes (if needed)
stop_processes() {
    echo "Stopping backend and frontend..."
    pkill -f dotnet
    pkill -f npm
}

# Register a trap to run on script exit to ensure processes are stopped
trap stop_processes EXIT

# Keep the script running to keep the processes alive
echo "Press Enter to stop both backend and frontend."
read
