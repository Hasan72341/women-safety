#!/bin/bash

# Women Safety Project Setup Script for macOS
# This script automatically configures Python 3.12 and sets up the virtual environment

echo "==========================================="
echo "Women Safety Project Setup - macOS"
echo "==========================================="

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "Homebrew is already installed."
fi

# Update Homebrew
echo "Updating Homebrew..."
brew update

# Install Python 3.12 if not already installed
if ! command -v python3.12 &> /dev/null; then
    echo "Installing Python 3.12..."
    brew install python@3.12
else
    echo "Python 3.12 is already installed."
fi

# Verify Python 3.12 installation
echo "Verifying Python 3.12 installation..."
python3.12 --version

# Create virtual environment
echo "Creating virtual environment..."
python3.12 -m venv env

# Activate virtual environment
echo "Activating virtual environment..."
source env/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "Installing project dependencies..."
pip install -r requirements.txt

# Check if installation was successful
if python -c "import numpy, torch, torchaudio, sounddevice, cv2, ultralytics, transformers, librosa; print('All dependencies installed successfully')"; then
    echo "==========================================="
    echo "Setup completed successfully!"
    echo "==========================================="
    echo ""
    echo "🎯 AVAILABLE FEATURES:"
    echo ""
    echo "📹 Real-time Face Emotion Detection:"
    echo "  python realtime_emotion.py"
    echo ""
    echo "🎤 Real-time Speech Emotion Recognition:"
    echo "  cd \"Speech Emotion Recognition System\""
    echo "  python realtime_speech_emotion.py"
    echo ""
    echo "🗣️  Advanced Speech Emotion Detector:"
    echo "  cd \"Speech Emotion Recognition System\""
    echo "  python speech_emotion_detector.py"
    echo ""
    echo "👥 Crowd Detection & Emotion Analysis:"
    echo "  cd \"crowd and emotion Vision system\""
    echo "  python yolo_crowd.py"
    echo ""
    echo "🔧 Environment Activation:"
    echo "  source env/bin/activate"
    echo "  deactivate (to exit)"
    echo ""
    echo "📋 Test Speech Model:"
    echo "  cd \"Speech Emotion Recognition System\""
    echo "  python test_model.py"
else
    echo "==========================================="
    echo "Setup completed with some issues."
    echo "Please check the error messages above."
    echo "==========================================="
fi