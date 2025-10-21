# Setup Instructions

This document explains how to set up the Women Safety Project on different operating systems.

## Automated Setup

### For macOS Users

1. Open Terminal
2. Navigate to the project directory:
   ```bash
   cd /path/to/women-safety
   ```
3. Run the setup script:
   ```bash
   ./setup_mac.sh
   ```

### For Windows Users

1. Open Command Prompt or PowerShell as Administrator
2. Navigate to the project directory:
   ```cmd
   cd \path\to\women-safety
   ```
3. Run the setup script:
   ```cmd
   setup_windows.bat
   ```

### For Linux Users

1. Open Terminal
2. Navigate to the project directory:
   ```bash
   cd /path/to/women-safety
   ```
3. Make the script executable:
   ```bash
   chmod +x setup_linux.sh
   ```
4. Run the setup script:
   ```bash
   ./setup_linux.sh
   ```

## Manual Setup (Alternative)

If you prefer to set up manually or encounter issues with the automated scripts:

### 1. Install Python 3.12
- **macOS**: `brew install python@3.12`
- **Windows**: Download from [python.org](https://www.python.org/downloads/)

### 2. Create Virtual Environment
```bash
python3.12 -m venv env
```

### 3. Activate Virtual Environment
- **macOS/Linux**: `source env/bin/activate`
- **Windows**: `env\Scripts\activate.bat`

### 4. Upgrade pip
```bash
pip install --upgrade pip
```

### 5. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 6. Install Frontend Dependencies
```bash
cd frontend
npm install
```

## Verifying Installation

After setup, verify that all dependencies are installed correctly:

```bash
python -c "import numpy, torch, torchaudio, sounddevice, cv2, ultralytics, transformers, librosa; print('All dependencies installed successfully')"
```

### Test Speech Emotion Model
To test the speech emotion recognition model:
```bash
cd "Speech Emotion Recognition System"
python test_model.py
```

## Running the Applications

### Activate Environment First
- **macOS/Linux**: `source env/bin/activate`
- **Windows**: `env\Scripts\activate.bat`

### Run Applications

#### Python Backend
1. **Main Application**:
   ```bash
   python src/main.py
   ```

2. **Real-time Face Emotion Detection**:
   ```bash
   python src/vision/crowd_detector.py
   ```

3. **Real-time Speech Emotion Recognition** (Quick Start):
   ```bash
   python src/audio/realtime_speech_emotion.py
   ```

4. **Simple Automatic Speech Emotion Recognition**:
   ```bash
   python src/audio/simple_automatic_speech_emotion.py
   ```

5. **Advanced Speech Emotion Detector** (Full Features):
   ```bash
   python src/audio/speech_emotion_detector.py
   ```

6. **Test Speech Model**:
   ```bash
   python src/audio/test_model.py
   ```

#### React Frontend
1. **Start Development Server**:
   ```bash
   cd frontend
   npm run dev
   ```
   
   The development server will start with Hot Module Replacement (HMR) enabled at http://localhost:5173.
   Changes to React components will update instantly without full page reloads.

2. **Build for Production**:
   ```bash
   cd frontend
   npm run build
   ```

## Troubleshooting

### Common Issues

1. **Permission denied (macOS)**:
   ```bash
   chmod +x setup_mac.sh
   ./setup_mac.sh
   ```

2. **Python version not found**:
   - Ensure Python 3.12 is installed
   - Update PATH environment variable if needed

4. **Package installation failures**:
   - Try upgrading pip: `pip install --upgrade pip`
   - Install packages individually: `pip install numpy torch torchaudio sounddevice opencv-python ultralytics transformers librosa`

5. **Speech Emotion Model Issues**:
   - Ensure internet connection for model download
   - Check Hugging Face model availability: `firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3`
   - Test model loading: `cd src/audio && python test_model.py`

6. **Frontend Issues**:
   - Ensure Node.js is installed: `node --version`
   - Clear npm cache: `npm cache clean --force`
   - Reinstall dependencies: `cd frontend && rm -rf node_modules && npm install`
   - Check for port conflicts: `lsof -i :5173`
   
7. **Hot Reload Issues**:
   - Restart the development server: `npm run dev`
   - Check browser console for HMR errors
   - Ensure file watchers are not disabled
   - Verify environment variables are correctly set

4. **Audio device issues**:
   - Ensure microphone is connected and accessible
   - Check system audio permissions

### Need Help?

If you encounter any issues:
1. Check that all prerequisites are met
2. Verify your Python version is 3.12
3. Ensure you have sufficient permissions
4. Check the error messages for specific guidance

For additional support, please refer to the documentation of individual packages:
- [PyTorch](https://pytorch.org/get-started/locally/)
- [OpenCV](https://opencv.org/)
- [Ultralytics YOLO](https://docs.ultralytics.com/)