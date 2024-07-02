# Task Management App

## Overview
This is a Task Management Application built with a React frontend and an ASP.NET Core backend. It allows users to register, log in, and manage their tasks with various statuses.

## Prerequisites
- Node.js (https://nodejs.org/)
- .NET SDK (https://dotnet.microsoft.com/download)

## Running the Application

### Running the Backend

To run the backend API server:

1. Navigate to the backend directory:
    ```bash
    cd backend/TaskListAPI
    ```
2. Restore the dependencies and run the backend server:
    ```bash
    dotnet restore
    dotnet run
    ```

The backend server should start running at `https://localhost:7244` or `http://localhost:5083`.

### Running the Frontend

To run the frontend React application:

1. Navigate to the frontend directory:
    ```bash
    cd frontend/task-list-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the frontend application:
    ```bash
    npm start
    ```

The frontend application should start running at `http://localhost:3000`.

### Running Both Frontend and Backend Using PowerShell Script

To run both the frontend and backend together using the provided PowerShell script:

1. Navigate to the root directory of the project where the `start-app.ps1` script is located.

2. Set the execution policy to allow the script to run (if not already set):
    ```powershell
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    ```

3. Run the PowerShell script:
    ```powershell
    ./start-app.ps1
    ```

The script will start both the backend and frontend applications. You can stop both applications by pressing `Enter` in the PowerShell window.

### Running Both Frontend and Backend Using Bash Script (macOS)

To run both the frontend and backend together using the provided Bash script:

1. Navigate to the root directory of the project where the `start-app.sh` script is located.

2. Make the Bash script executable (if not already done):
    ```bash
    chmod +x start-app.sh
    ```

3. If you encounter a permission denied error for `react-scripts`, run:
    ```bash
    chmod +x frontend/task-list-app/node_modules/.bin/*
    ```

4. Run the Bash script:
    ```bash
    ./start-app.sh
    ```

The script will start both the backend and frontend applications. You can stop both applications by pressing `Ctrl + C` in the terminal window.

## Features

- **User Registration and Login:** Users can register with a username, email, and password. They can then log in with their credentials.
- **Profile Management:** Users can upload, update, and delete their profile picture.
- **Task Management:** Users can create, update, and delete tasks. Tasks can be set to different statuses: Pending, In Progress, and Completed.

## Additional Information

- **Test User Credentials:**
    - Username: `test_user`
    - Password: `test123`
- **Technologies Used:**
    - **Frontend:** React, Material-UI, Bootstrap
    - **Backend:** ASP.NET Core, Entity Framework Core, SQLite
