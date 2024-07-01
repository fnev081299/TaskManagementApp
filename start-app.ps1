# Navigate to the backend directory and start the backend
Write-Host "Starting backend..."
cd backend/TaskListAPI/TaskListAPI
Start-Process -NoNewWindow -FilePath "dotnet" -ArgumentList "run"

# Navigate back to the root directory
cd ../../..

# Navigate to the frontend directory and start the frontend
Write-Host "Starting frontend..."
cd frontend/task-list-app
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c npm start"

# Navigate back to the root directory
cd ../..

# Function to stop processes (if needed)
function Stop-Processes {
    Write-Host "Stopping backend and frontend..."
    $dotnetProcesses = Get-Process -Name "dotnet" -ErrorAction SilentlyContinue
    if ($dotnetProcesses) {
        Stop-Process -Name "dotnet" -Force
    } else {
        Write-Host "No 'dotnet' processes found."
    }
    $npmProcesses = Get-Process -Name "cmd" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*npm*" }
    if ($npmProcesses) {
        Stop-Process -Name "cmd" -Force
    } else {
        Write-Host "No 'npm' processes found."
    }
}

# Register a script block to run on exit to ensure processes are stopped
$null = Register-EngineEvent PowerShell.Exiting -Action { Stop-Processes }

# Keep the script running to keep the processes alive
Write-Host "Press Enter to stop both backend and frontend."
Read-Host
Stop-Processes
