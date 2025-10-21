# Women Safety Project

This repository contains multiple AI-powered systems designed to enhance women's safety through technology.

## Systems Included

### 1. Real-time Emotion Detection
- **File**: `src/vision/crowd_detector.py`
- **Models**: `models/yolov8n.pt`, `models/yolov8n-pose.pt`
- **Description**: Detects crowds and human poses using YOLOv8

### Speech Emotion Recognition
- **Main Script**: `src/audio/speech_emotion_detector.py`
- **Real-time Script**: `src/audio/realtime_speech_emotion.py`
- **Simple Real-time**: `src/audio/simple_automatic_speech_emotion.py`
- **Test Script**: `src/audio/test_model.py`
- **Model**: `firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3` (Hugging Face)
- **Description**: Advanced speech emotion recognition using OpenAI Whisper Large V3 model
- **Emotions**: Happy, Sad, Angry, Neutral, Disgust, Fearful, Surprised

### 3. Decision Engine (Coming Soon)
- **File**: `src/core/decision_engine.py`
- **Description**: Central decision engine for coordinating all safety systems

### 4. Emergency Response (Coming Soon)
- **File**: `src/emergency/emergency_system.py`
- **Description**: Emergency response system for handling critical situations

## Installation

### Automated Setup (Recommended)
Run the appropriate setup script for your operating system:
- **macOS**: `./setup_mac.sh`
- **Windows**: `setup_windows.bat`
- **Linux**: `./setup_linux.sh`

### Manual Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd women-safety
   ```

2. Activate the virtual environment:
   ```bash
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. For speech emotion recognition, install additional packages:
   ```bash
   pip install git+https://github.com/speechbrain/speechbrain.git@develop
   pip install transformers torchaudio librosa torchcodec
   ```

## Usage

### Python Backend

#### Activate Environment First
- **macOS/Linux**: `source env/bin/activate`
- **Windows**: `env\Scripts\activate.bat`

#### Run Applications
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

### React Frontend

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start Development Server
```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:5173 with Hot Module Replacement (HMR) enabled for instant updates during development.

#### Build for Production
```bash
cd frontend
npm run build
```

#### Advanced Usage
```bash
cd "Speech Emotion Recognition System"
python speech_emotion_detector.py
```

#### Test the Model
```bash
cd "Speech Emotion Recognition System"
python test_model.py
```

**Features:**
- **NEW**: Fully automatic real-time speech emotion detection
- **NEW**: Continuous monitoring without user interaction
- Real-time microphone emotion detection
- Audio file analysis
- Multiple emotion categories (Happy, Sad, Angry, Neutral, Disgust, Fearful, Surprised)
- Confidence scores and visual indicators (🟢🟡🟠)
- Timestamped emotion tracking
- Hugging Face Whisper Large V3 model integration

### Crowd Detection
```bash
python yolo_crowd.py
```

## Project Structure

```
women-safety/
├── models/                       # Pre-trained models
│   ├── yolov8n.pt                # YOLO object detection model
│   └── yolov8n-pose.pt           # YOLO pose estimation model
├── src/                          # Python source code
│   ├── main.py                   # Main application entry point
│   ├── core/                     # Core decision engine
│   │   └── decision_engine.py    # Central decision system
│   ├── vision/                   # Vision processing modules
│   │   └── crowd_detector.py     # Crowd and pose detection
│   ├── audio/                    # Audio processing modules
│   │   ├── speech_emotion_detector.py    # Main speech emotion detector
│   │   ├── realtime_speech_emotion.py    # Real-time speech emotion recognition
│   │   ├── simple_automatic_speech_emotion.py # Simple automatic mode
│   │   └── test_model.py         # Model testing script
│   ├── emergency/                # Emergency response system
│   │   └── emergency_system.py   # Emergency calling and messaging
│   └── utils/                    # Utility functions
│       └── helpers.py            # Helper functions
├── frontend/                     # React frontend application
│   ├── src/                      # Frontend source code
│   │   ├── pages/                # Page components (Dashboard, Emergency, Settings)
│   │   ├── services/             # API services
│   │   ├── hooks/                # Custom hooks
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── public/                   # Static assets
│   ├── package.json              # Frontend dependencies
│   └── README.md                 # Frontend documentation
├── assets/                       # Documentation and assets
│   └── audio_readme.md           # Audio system documentation
├── requirements.txt              # Python dependencies
├── env/                          # Virtual environment
└── snapshots/                    # Image snapshots
```

## Features

### Real-time Emotion Detection (Crowd & Pose Analysis)
- Detects people in images and video
- Estimates crowd size
- Pose estimation for human body analysis
- Uses state-of-the-art YOLOv8 models
- Real-time processing with safety dashboard

### Speech Emotion Recognition
- **NEW**: Uses Hugging Face Whisper Large V3 model (`firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3`)
- Classifies 7 emotions: Happy, Sad, Angry, Neutral, Disgust, Fearful, Surprised
- Real-time microphone input processing
- Audio file analysis support
- High accuracy (91.99% on test dataset)
- Confidence scores and probability distributions
- Fully automatic continuous monitoring
- No simulation mode - fully functional with pre-trained model

### Decision Engine (Coming Soon)
- Central decision engine for coordinating all safety systems
- Multi-modal threat assessment combining vision and audio inputs
- Risk scoring algorithm based on environmental factors
- Adaptive sensitivity based on context

### Emergency Response (Coming Soon)
- Automatic 112 calling with location data
- Contact notification cascade (SMS → Call → Email)
- Real-time GPS location sharing
- Evidence collection (photos, audio, timestamps)
- Multi-channel alert system

## Requirements

- Python 3.8+
- OpenCV
- TensorFlow/Keras
- PyTorch
- Transformers (Hugging Face)
- Ultralytics (YOLOv8)
- NumPy, SciPy, Pandas
- Matplotlib, Seaborn

See `requirements.txt` for complete list of dependencies.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Pre-trained models from Hugging Face and Ultralytics
- Datasets from Kaggle
- Open-source libraries that made this project possible