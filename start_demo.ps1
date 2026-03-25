Write-Host "🚀 Starting LaunchGen AI Prototype..." -ForegroundColor Cyan

# Start System Backend
Write-Host "Starting System Backend on port 8001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd .\system-backend; pip install -r requirements.txt; uvicorn main:app --port 8001"

# Start Product Backend
Write-Host "Starting Product Backend on port 8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd .\product-backend; pip install -r requirements.txt; uvicorn main:app --port 8000"

# Start Frontend
Write-Host "Starting Frontend on port 5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd .\launchgen-prototype; npm run dev"

Write-Host "✅ All services launched!" -ForegroundColor Green
Write-Host "Open http://localhost:5173 to view the LaunchGen Dashboard."
Write-Host "Open http://localhost:8000 to view the simulated Product Dashboard."
