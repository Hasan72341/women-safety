# 🎤 Speech Emotion Recognition System

Advanced speech emotion recognition using Hugging Face's OpenAI Whisper Large V3 model.

## 🎯 Features

- **Real-time emotion detection** from microphone input
- **Audio file analysis** for emotion classification
- **7 emotion categories**: Happy, Sad, Angry, Neutral, Disgust, Fearful, Surprised
- **High accuracy**: 91.99% on test dataset
- **Confidence scores** and probability distributions
- **Hugging Face Whisper Large V3** model integration

## 🚀 Quick Start

### Automatic Real-time Speech Emotion Detection (NEW - Fully Automatic!)
```bash
# Simple automatic version (recommended)
python simple_automatic_speech_emotion.py

# Advanced automatic version with customizable parameters
python realtime_speech_emotion.py --chunk-duration 3 --overlap 1 --threshold 0.3
```

### Manual Real-time Speech Emotion Detection
```bash
python speech_emotion_detector.py
```

### Test the Model
```bash
python test_model.py
```

## 📋 Usage Guide

### Automatic Real-time Speech Emotion (NEW!)
- **Fully automatic** - no user interaction required
- **Continuous monitoring** - analyzes speech in real-time
- **Simple version**: `simple_automatic_speech_emotion.py`
- **Advanced version**: `realtime_speech_emotion.py` with customizable parameters
- **Visual feedback** with confidence indicators (🟢🟡🟠)
- **Timestamped results** for emotion tracking
- **Configurable parameters**: chunk duration, overlap, threshold

### Advanced Speech Emotion Detector (`speech_emotion_detector.py`)
- Full-featured emotion analysis system
- Multiple input methods:
  - Live microphone recording
  - Audio file analysis
- Detailed emotion probability breakdown
- Visual confidence indicators
- Interactive menu system

### Model Testing (`test_model.py`)
- Verifies model loading and functionality
- Tests with dummy audio data
- Validates all dependencies

## 🧠 Model Information

- **Model**: `firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3`
- **Base Model**: OpenAI Whisper Large V3
- **Training Dataset**: RAVDESS, SAVEE, TESS, URDU
- **Emotions**: 7 categories (Happy, Sad, Angry, Neutral, Disgust, Fearful, Surprised)
- **Accuracy**: 91.99% (F1 Score: 91.98%)
- **Framework**: Hugging Face Transformers

## 🔧 Technical Details

### Dependencies
```python
transformers>=4.57.1
torch>=2.5.1
torchaudio>=2.5.1
librosa>=0.11.0
sounddevice>=0.5.2
soundfile>=0.13.1
numpy>=1.26.4
```

### Audio Processing
- Sampling rate: 16kHz
- Maximum duration: 30 seconds
- Automatic resampling and normalization
- Feature extraction with Whisper feature extractor

### Model Architecture
- Based on OpenAI Whisper Large V3
- Fine-tuned for audio classification
- 7-class emotion classification
- Native AMP (Automatic Mixed Precision) support

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Accuracy | 91.99% |
| Precision | 92.30% |
| Recall | 91.99% |
| F1 Score | 91.98% |
| Loss | 0.5008 |

## 🎮 Interactive Features

### Advanced Detector Menu
1. **🎤 Record and analyze live audio** - Real-time microphone emotion detection
2. **🎵 Analyze audio file** - Process pre-recorded audio files
3. **🚪 Exit** - Close the application

### Audio File Support
- WAV, MP3, FLAC, OGG formats
- Automatic format detection
- Batch processing capability

## 🛠️ Troubleshooting

### Common Issues

1. **Model Download Issues**
   - Ensure stable internet connection
   - Check Hugging Face model availability
   - Verify transformers library version

2. **Audio Device Issues**
   - Check microphone permissions
   - Verify audio device selection
   - Test with `sounddevice.query_devices()`

3. **Memory Issues**
   - Reduce audio duration for large files
   - Close other applications
   - Use GPU if available

4. **Performance Issues**
   - Enable GPU acceleration
   - Reduce batch size if needed
   - Optimize audio preprocessing

### Testing Commands
```bash
# Test audio devices
python -c "import sounddevice; print(sounddevice.query_devices())"

# Test model loading
python test_model.py

# Test basic functionality
python -c "from transformers import AutoModelForAudioClassification; print('Model loading works')"
```

## 📈 Model Training Details

- **Learning Rate**: 5e-05
- **Batch Size**: 2 (effective batch size: 10 with gradient accumulation)
- **Epochs**: 25
- **Optimizer**: Adam (betas=(0.9, 0.999), epsilon=1e-08)
- **Scheduler**: Linear with 0.1 warmup ratio
- **Mixed Precision**: Native AMP

## 🔗 Related Links

- [Hugging Face Model](https://huggingface.co/firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3)
- [OpenAI Whisper](https://openai.com/research/whisper)
- [SpeechBrain](https://speechbrain.github.io/)
- [Librosa Documentation](https://librosa.org/doc/latest/index.html)

## 📚 Examples

### Basic Usage
```python
from speech_emotion_detector import SpeechEmotionDetector

detector = SpeechEmotionDetector()

# Real-time detection
emotion, confidence = detector.record_and_predict(duration=3)
print(f"Emotion: {emotion}, Confidence: {confidence}")

# File analysis
emotion, confidence, all_probs = detector.predict_emotion_from_file("audio.wav")
print(f"Emotion: {emotion}, Confidence: {confidence}")
```

### Advanced Usage
```python
# Initialize with custom model
detector = SpeechEmotionDetector("custom-model-name")

# Process multiple files
import os
for file in os.listdir("audio_folder"):
    if file.endswith(".wav"):
        emotion, confidence, probs = detector.predict_emotion_from_file(f"audio_folder/{file}")
        print(f"{file}: {emotion} ({confidence:.2%})")
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Test your changes thoroughly
4. Submit a pull request

## 📄 License

This project is part of the Women Safety Project and follows the same licensing terms.

## 🙏 Acknowledgments

- **Firdhokk** for the excellent pre-trained model
- **Hugging Face** for the transformers library
- **OpenAI** for the Whisper architecture
- **Librosa** team for audio processing tools