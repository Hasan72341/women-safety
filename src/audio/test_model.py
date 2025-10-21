#!/usr/bin/env python3
"""
Simple test script for speech emotion recognition
Tests the model loading and basic functionality
"""

import torch
import numpy as np
from transformers import AutoModelForAudioClassification, AutoFeatureExtractor
import librosa

def test_model_loading():
    """Test if the model can be loaded successfully."""
    print("🧪 Testing Speech Emotion Recognition Model...")
    
    model_id = "firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3"
    
    try:
        print(f"📡 Loading model: {model_id}")
        
        # Load model and feature extractor
        model = AutoModelForAudioClassification.from_pretrained(model_id)
        feature_extractor = AutoFeatureExtractor.from_pretrained(model_id, do_normalize=True)
        
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"🔧 Using device: {device}")
        
        model = model.to(device)
        id2label = model.config.id2label
        
        print(f"✅ Model loaded successfully!")
        print(f"🎯 Available emotions: {list(id2label.values())}")
        
        # Test with dummy audio
        print("\n🎵 Testing with dummy audio...")
        dummy_audio = np.random.randn(16000) * 0.1  # 1 second of noise
        sampling_rate = 16000
        
        # Preprocess
        max_length = int(feature_extractor.sampling_rate * 30.0)
        if len(dummy_audio) > max_length:
            dummy_audio = dummy_audio[:max_length]
        else:
            dummy_audio = np.pad(dummy_audio, (0, max_length - len(dummy_audio)))
        
        inputs = feature_extractor(
            dummy_audio,
            sampling_rate=sampling_rate,
            max_length=max_length,
            truncation=True,
            return_tensors="pt",
        )
        
        # Move to device
        inputs = {key: value.to(device) for key, value in inputs.items()}
        
        # Predict
        with torch.no_grad():
            outputs = model(**inputs)
        
        logits = outputs.logits
        predicted_id = torch.argmax(logits, dim=-1).item()
        predicted_label = id2label[predicted_id]
        
        print(f"🎯 Test prediction: {predicted_label}")
        print("✅ Model test completed successfully!")
        
        return True
        
    except Exception as e:
        print(f"❌ Error during model test: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_model_loading()
    if success:
        print("\n🎉 Speech Emotion Recognition model is ready to use!")
        print("You can now run: python speech_emotion_detector.py")
    else:
        print("\n❌ Model test failed. Please check your setup.")