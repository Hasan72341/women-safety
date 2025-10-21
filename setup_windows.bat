@echo off
REM Women Safety Project Setup Script for Windows
REM This script automatically configures Python 3.12 and sets up the virtual environment

echo ===========================================
echo Women Safety Project Setup - Windows
echo ===========================================

REM Check if Python 3.12 is installed
python --version | findstr "3.12" >nul
if %errorlevel% neq 0 (
    echo Python 3.12 not found. Please install Python 3.12 from https://www.python.org/downloads/
    echo Then run this script again.
    pause
    exit /b 1
) else (
    echo Python 3.12 is already installed.
)

REM Verify Python installation
echo Verifying Python 3.12 installation...
python --version

REM Create virtual environment
echo Creating virtual environment...
python -m venv env

REM Activate virtual environment
echo Activating virtual environment...
call env\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install requirements
echo Installing project dependencies...
pip install -r requirements.txt

REM Check if installation was successful
python -c "import numpy, torch, torchaudio, sounddevice, cv2, ultralytics, transformers, librosa; print('All dependencies installed successfully')" >nul 2>&1
if %errorlevel% equ 0 (
    echo ===========================================
    echo Setup completed successfully!
    echo ===========================================
    echo.
    echo 🎯 AVAILABLE FEATURES:
    echo.
    echo 🏠 Main Application:
    echo   python src/main.py
    echo.
    echo 📹 Real-time Face Emotion Detection:
    echo   python src/vision/crowd_detector.py
    echo.
    echo 🎤 Real-time Speech Emotion Recognition:
    echo   python src/audio/realtime_speech_emotion.py
    echo.
    echo 🗣️  Advanced Speech Emotion Detector:
    echo   python src/audio/speech_emotion_detector.py
    echo.
    echo 👥 Crowd Detection ^& Emotion Analysis:
    echo   python src/vision/crowd_detector.py
    echo.
    echo 🔧 Environment Activation:
    echo   env\Scripts\activate.bat
    echo   deactivate (to exit)
    echo.
    echo 📋 Test Speech Model:
    echo   python src/audio/test_model.py
    echo.
    echo Press any key to exit...
    pause >nul
) else (
    echo ===========================================
    echo Setup completed with some issues.
    echo Please check the error messages above.
    echo ===========================================
    echo Press any key to exit...
    pause >nul
)