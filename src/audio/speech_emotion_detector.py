#!/usr/bin/env python3
"""
Speech Emotion Recognition using Hugging Face Whisper Model
This script uses the firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3 model
to detect emotions from speech/audio files.
"""

import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

import torch
import librosa
import numpy as np
from transformers import AutoModelForAudioClassification, AutoFeatureExtractor
import sounddevice as sd
import soundfile as sf
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

class SpeechEmotionDetector:
    def __init__(self, model_id="firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3"):
        """Initialize the speech emotion detector with the specified model."""
        print("🎤 Initializing Speech Emotion Detector...")
        print(f"📡 Loading model: {model_id}")
        
        self.model_id = model_id
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"🔧 Using device: {self.device}")
        
        # Load model and feature extractor
        self.model = AutoModelForAudioClassification.from_pretrained(model_id)
        self.feature_extractor = AutoFeatureExtractor.from_pretrained(model_id, do_normalize=True)
        self.id2label = self.model.config.id2label
        
        # Move model to device
        self.model = self.model.to(self.device)
        
        print(f"✅ Model loaded successfully!")
        print(f"🎯 Available emotions: {list(self.id2label.values())}")
    
    def preprocess_audio(self, audio_array, sampling_rate, max_duration=30.0):
        """Preprocess audio array for model input."""
        max_length = int(self.feature_extractor.sampling_rate * max_duration)
        
        # Resample if necessary
        if sampling_rate != self.feature_extractor.sampling_rate:
            audio_array = librosa.resample(audio_array, orig_sr=sampling_rate, 
                                         target_sr=self.feature_extractor.sampling_rate)
            sampling_rate = self.feature_extractor.sampling_rate
        
        # Trim or pad audio
        if len(audio_array) > max_length:
            audio_array = audio_array[:max_length]
        else:
            audio_array = np.pad(audio_array, (0, max_length - len(audio_array)))
        
        # Extract features
        inputs = self.feature_extractor(
            audio_array,
            sampling_rate=sampling_rate,
            max_length=max_length,
            truncation=True,
            return_tensors="pt",
        )
        return inputs
    
    def predict_emotion_from_array(self, audio_array, sampling_rate=16000, max_duration=30.0):
        """Predict emotion from audio array."""
        inputs = self.preprocess_audio(audio_array, sampling_rate, max_duration)
        
        # Move inputs to device
        inputs = {key: value.to(self.device) for key, value in inputs.items()}
        
        # Predict
        with torch.no_grad():
            outputs = self.model(**inputs)
        
        logits = outputs.logits
        probabilities = torch.softmax(logits, dim=-1)
        predicted_id = torch.argmax(logits, dim=-1).item()
        predicted_label = self.id2label[predicted_id]
        confidence = probabilities[0][predicted_id].item()
        
        # Get all emotion probabilities
        all_emotions = {}
        for i, emotion in self.id2label.items():
            all_emotions[emotion] = probabilities[0][i].item()
        
        return predicted_label, confidence, all_emotions
    
    def predict_emotion_from_file(self, audio_path, max_duration=30.0):
        """Predict emotion from audio file."""
        print(f"🎵 Processing audio file: {audio_path}")
        
        try:
            # Load audio file
            audio_array, sampling_rate = librosa.load(audio_path, sr=self.feature_extractor.sampling_rate)
            
            # Predict emotion
            predicted_label, confidence, all_emotions = self.predict_emotion_from_array(
                audio_array, sampling_rate, max_duration
            )
            
            return predicted_label, confidence, all_emotions
            
        except Exception as e:
            print(f"❌ Error processing file {audio_path}: {str(e)}")
            return None, 0.0, {}
    
    def record_audio(self, duration=5, sample_rate=16000):
        """Record audio from microphone."""
        print(f"🎤 Recording for {duration} seconds...")
        print("🗣️  Please speak now!")
        
        try:
            # Record audio
            audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, 
                          channels=1, dtype='float32')
            sd.wait()  # Wait until recording is finished
            
            print("✅ Recording finished!")
            return audio.flatten(), sample_rate
            
        except Exception as e:
            print(f"❌ Error recording audio: {str(e)}")
            return None, sample_rate
    
    def predict_emotion_live(self, duration=5):
        """Record and predict emotion from microphone."""
        audio_array, sampling_rate = self.record_audio(duration)
        
        if audio_array is not None:
            predicted_label, confidence, all_emotions = self.predict_emotion_from_array(
                audio_array, sampling_rate
            )
            return predicted_label, confidence, all_emotions
        
        return None, 0.0, {}
    
    def display_results(self, predicted_label, confidence, all_emotions, audio_source):
        """Display prediction results."""
        print("\n" + "="*50)
        print(f"🎯 EMOTION PREDICTION RESULTS for: {audio_source}")
        print("="*50)
        print(f"😊 Predicted Emotion: {predicted_label}")
        print(f"📊 Confidence: {confidence:.4f} ({confidence*100:.2f}%)")
        print("\n📈 All Emotion Probabilities:")
        
        # Sort emotions by probability
        sorted_emotions = sorted(all_emotions.items(), key=lambda x: x[1], reverse=True)
        
        for emotion, prob in sorted_emotions:
            percentage = prob * 100
            bar_length = int(prob * 30)  # 30 character bar
            bar = "█" * bar_length + "░" * (30 - bar_length)
            print(f"  {emotion:12} | {bar} | {percentage:5.2f}%")
        
        print("="*50)

def main():
    """Main function to run the speech emotion detector."""
    print("🚀 Speech Emotion Recognition System")
    print("Using Hugging Face Whisper Large V3 Model")
    print("="*60)
    
    # Initialize detector
    detector = SpeechEmotionDetector()
    
    while True:
        print("\n📋 Options:")
        print("1. 🎤 Record and analyze live audio")
        print("2. 🎵 Analyze audio file")
        print("3. 🚪 Exit")
        
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == '1':
            # Live recording
            duration = input("Enter recording duration in seconds (default 5): ").strip()
            duration = int(duration) if duration else 5
            
            predicted_label, confidence, all_emotions = detector.predict_emotion_live(duration)
            
            if predicted_label:
                detector.display_results(predicted_label, confidence, all_emotions, "Live Recording")
            else:
                print("❌ Failed to process audio")
        
        elif choice == '2':
            # File analysis
            audio_path = input("Enter path to audio file: ").strip()
            
            if os.path.exists(audio_path):
                predicted_label, confidence, all_emotions = detector.predict_emotion_from_file(audio_path)
                
                if predicted_label:
                    detector.display_results(predicted_label, confidence, all_emotions, audio_path)
                else:
                    print("❌ Failed to process audio file")
            else:
                print(f"❌ File not found: {audio_path}")
        
        elif choice == '3':
            print("👋 Thank you for using Speech Emotion Detector!")
            break
        
        else:
            print("❌ Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()