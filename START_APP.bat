@echo off
cd /d "%~dp0"
echo Starting AI Resume Builder...
echo.
echo After the server starts, open:  http://localhost:3000
echo If port 3000 is busy, check the message below for the actual URL (e.g. 3001).
echo.
echo Keep this window OPEN while using the app. Close it to stop the server.
echo.
npm run dev
pause
