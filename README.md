# Women Safety Project

This repository contains multiple AI-powered systems designed to enhance women's safety through technology.

## Systems Included

### 1. Real-time Emotion Detection
- **File**: `realtime_emotion.py`
- **Model**: `emotion_model.h5`
- **Labels**: `emotion_labels.joblib`
- **Description**: Detects facial emotions in real-time using computer vision

### Speech Emotion Recognition
- **Main Script**: `Speech Emotion Recognition System/speech_emotion_detector.py`
- **Real-time Script**: `Speech Emotion Recognition System/realtime_speech_emotion.py`
- **Test Script**: `Speech Emotion Recognition System/test_model.py`
- **Model**: `firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3` (Hugging Face)
- **Description**: Advanced speech emotion recognition using OpenAI Whisper Large V3 model
- **Emotions**: Happy, Sad, Angry, Neutral, Disgust, Fearful, Surprised

### 3. Crowd Detection
- **File**: `yolo_crowd.py`
- **Models**: `yolov8n.pt`, `yolov8n-pose.pt`
- **Description**: Detects crowds and human poses using YOLOv8

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

### Real-time Emotion Detection
```bash
python realtime_emotion.py
```

### Speech Emotion Recognition

#### Quick Start (NEW - Fully Automatic!)
```bash
# Navigate to the speech emotion recognition directory:
cd "Speech Emotion Recognition System"

# Simple automatic real-time detection (just run and speak!):
python simple_automatic_speech_emotion.py

# Advanced automatic version with customizable parameters:
python realtime_speech_emotion.py --chunk-duration 3 --overlap 1 --threshold 0.3
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
├── emotion_model.h5              # Facial emotion detection model
├── emotion_labels.joblib         # Labels for emotion detection
├── realtime_emotion.py           # Real-time emotion detection script
├── yolo_crowd.py                 # Crowd detection using YOLO
├── yolov8n.pt                    # YOLO object detection model
├── yolov8n-pose.pt               # YOLO pose estimation model
├── requirements.txt              # Python dependencies
├── env/                          # Virtual environment
│
├── Speech Emotion Recognition System/
│   ├── speech_emotion_detector.py    # Main speech emotion detector
│   ├── realtime_speech_emotion.py    # Real-time speech emotion recognition
│   ├── test_model.py                 # Model testing script
│   └── 1.py                          # Legacy file (empty)
│
└── snapshots/                    # Image snapshots
```

## Features

### Real-time Emotion Detection
- Detects 7 facial emotions: angry, disgust, fear, happy, neutral, sad, surprise
- Uses OpenCV for webcam capture
- Real-time processing with FPS counter

### Speech Emotion Recognition
- **NEW**: Uses Hugging Face Whisper Large V3 model (`firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3`)
- Classifies 7 emotions: Happy, Sad, Angry, Neutral, Disgust, Fearful, Surprised
- Real-time microphone input processing
- Audio file analysis support
- High accuracy (91.99% on test dataset)
- Confidence scores and probability distributions
- No simulation mode - fully functional with pre-trained model

### Crowd Detection
- Detects people in images and video
- Estimates crowd size
- Pose estimation for human body analysis
- Uses state-of-the-art YOLOv8 models

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