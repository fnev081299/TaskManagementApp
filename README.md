# Task Management App

## Overview
This application is a Task Management App that allows users to register, log in, add tasks, update task status, and delete tasks.

## Prerequisites
- Node.js (https://nodejs.org/)
- .NET SDK (https://dotnet.microsoft.com/download)

## Setup and Run

### Running the Application

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/TaskManagementApp.git
    ```

2. Navigate to the project directory:
    ```sh
    cd TaskManagementApp
    ```

3. Run the PowerShell script to start both backend and frontend:
    ```sh
    ./start-app.ps1
    ```

### Running Backend Alone

1. Navigate to the backend directory:
    ```sh
    cd backend/TaskListAPI/TaskListAPI
    ```

2. Restore .NET dependencies and run the backend:
    ```sh
    dotnet restore
    dotnet run
    ```

The backend server should start running at `https://localhost:7244` or `http://localhost:5083`.
### Running Frontend Alone

1. Navigate to the frontend directory:
    ```sh
    cd frontend/task-list-app
    ```

2. Install Node.js dependencies and start the frontend:
    ```sh
    npm install
    npm start
    ```

## Using the Application

### Register and Login
- Click on "Register" to create a new account.
- Click on "Login" to log into your account.

### Add a Task
- Click on "Add New Task" to create a new task.

### Update Task Status
- Click on a task to edit its details and update its status.

### Delete a Task
- Click on the delete button next to a task to remove it.

- **Test User Credentials:**
    - Username: `test_user`
    - Password: `test123`

- **Technologies Used:**
    - **Frontend:** React, Material-UI, Bootstrap
    - **Backend:** ASP.NET Core, Entity Framework Core, SQLite

