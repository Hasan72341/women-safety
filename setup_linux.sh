#!/bin/bash

# Women Safety Project Setup Script for Linux
# This script automatically configures Python 3.12 and sets up the virtual environment

echo "==========================================="
echo "Women Safety Project Setup - Linux"
echo "==========================================="

# Detect Linux distribution
if [ -f /etc/os-release ]; then
    . /etc/os-release
    DISTRO=$ID
    echo "Detected Linux distribution: $DISTRO"
else
    echo "Could not detect Linux distribution. Assuming Ubuntu/Debian-like."
    DISTRO="ubuntu"
fi

# Update package manager
echo "Updating package manager..."
if [[ "$DISTRO" == "ubuntu" || "$DISTRO" == "debian" ]]; then
    sudo apt update
elif [[ "$DISTRO" == "fedora" ]]; then
    sudo dnf update -y
elif [[ "$DISTRO" == "centos" || "$DISTRO" == "rhel" ]]; then
    sudo yum update -y
elif [[ "$DISTRO" == "arch" ]]; then
    sudo pacman -Syu --noconfirm
else
    echo "Unsupported distribution. Please install Python 3.12 manually."
    exit 1
fi

# Install Python 3.12 if not already installed
if ! command -v python3.12 &> /dev/null; then
    echo "Installing Python 3.12..."
    if [[ "$DISTRO" == "ubuntu" || "$DISTRO" == "debian" ]]; then
        sudo apt install -y software-properties-common
        sudo add-apt-repository -y ppa:deadsnakes/ppa
        sudo apt update
        sudo apt install -y python3.12 python3.12-venv python3.12-dev
    elif [[ "$DISTRO" == "fedora" ]]; then
        sudo dnf install -y python3.12 python3.12-devel
    elif [[ "$DISTRO" == "centos" || "$DISTRO" == "rhel" ]]; then
        sudo yum install -y python3.12 python3.12-devel
    elif [[ "$DISTRO" == "arch" ]]; then
        sudo pacman -S --noconfirm python312
    fi
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

# Install system dependencies for audio and video
echo "Installing system dependencies..."
if [[ "$DISTRO" == "ubuntu" || "$DISTRO" == "debian" ]]; then
    sudo apt install -y portaudio19-dev python3-pyaudio libsndfile1 ffmpeg
elif [[ "$DISTRO" == "fedora" ]]; then
    sudo dnf install -y portaudio-devel python3-pyaudio libsndfile ffmpeg
elif [[ "$DISTRO" == "centos" || "$DISTRO" == "rhel" ]]; then
    sudo yum install -y portaudio-devel python3-pyaudio libsndfile ffmpeg
elif [[ "$DISTRO" == "arch" ]]; then
    sudo pacman -S --noconfirm portaudio python-pyaudio libsndfile ffmpeg
fi

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
    echo "🏠 Main Application:"
    echo "  python src/main.py"
    echo ""
    echo "📹 Real-time Face Emotion Detection:"
    echo "  python src/vision/crowd_detector.py"
    echo ""
    echo "🎤 Real-time Speech Emotion Recognition:"
    echo "  python src/audio/realtime_speech_emotion.py"
    echo ""
    echo "🗣️  Advanced Speech Emotion Detector:"
    echo "  python src/audio/speech_emotion_detector.py"
    echo ""
    echo "👥 Crowd Detection & Emotion Analysis:"
    echo "  python src/vision/crowd_detector.py"
    echo ""
    echo "🔧 Environment Activation:"
    echo "  source env/bin/activate"
    echo "  deactivate (to exit)"
    echo ""
    echo "📋 Test Speech Model:"
    echo "  python src/audio/test_model.py"
else
    echo "==========================================="
    echo "Setup completed with some issues."
    echo "Please check the error messages above."
    echo "==========================================="
fi