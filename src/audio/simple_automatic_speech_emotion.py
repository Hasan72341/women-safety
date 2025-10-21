#!/usr/bin/env python3
"""
Simple Automatic Real-time Speech Emotion Recognition
Just run and it starts listening continuously
"""

import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

import torch
import numpy as np
from transformers import AutoModelForAudioClassification, AutoFeatureExtractor
import sounddevice as sd
from datetime import datetime
import threading
import queue
import time

class SimpleAutomaticSpeechEmotion:
    def __init__(self, model_id="firdhokk/speech-emotion-recognition-with-openai-whisper-large-v3"):
        """Initialize the simple automatic speech emotion detector."""
        print("🎤 Initializing Simple Automatic Speech Emotion Recognition...")
        
        self.model_id = model_id
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.sample_rate = 16000
        self.chunk_duration = 3  # seconds
        self.overlap = 1  # seconds
        self.threshold = 0.3  # minimum confidence
        
        print(f"🔧 Using device: {self.device}")
        
        # Load model and feature extractor
        self.model = AutoModelForAudioClassification.from_pretrained(model_id)
        self.feature_extractor = AutoFeatureExtractor.from_pretrained(model_id, do_normalize=True)
        self.id2label = self.model.config.id2label
        
        # Move model to device
        self.model = self.model.to(self.device)
        
        # Processing variables
        self.audio_queue = queue.Queue()
        self.is_running = False
        self.current_emotion = "Neutral"
        self.current_confidence = 0.0
        
        print(f"✅ Model loaded successfully!")
        print(f"🎯 Available emotions: {list(self.id2label.values())}")
        print("🚀 Starting continuous emotion monitoring...")
        print("=" * 60)
        print("🎤 Listening... Speak naturally and emotions will be detected automatically!")
        print("Press Ctrl+C to stop")
        print("=" * 60)
    
    def audio_callback(self, indata, frames, time, status):
        """Callback function for continuous audio streaming."""
        if status:
            print(f"Audio status: {status}")
        self.audio_queue.put(indata.copy())
    
    def process_audio_chunk(self, audio_chunk):
        """Process a chunk of audio and predict emotion."""
        try:
            # Convert to numpy array
            audio_array = audio_chunk.flatten()
            
            # Preprocess
            max_length = int(self.feature_extractor.sampling_rate * 30.0)
            if len(audio_array) > max_length:
                audio_array = audio_array[:max_length]
            else:
                audio_array = np.pad(audio_array, (0, max_length - len(audio_array)))
            
            # Extract features
            inputs = self.feature_extractor(
                audio_array,
                sampling_rate=self.sample_rate,
                max_length=max_length,
                truncation=True,
                return_tensors="pt",
            )
            
            # Move to device
            inputs = {key: value.to(self.device) for key, value in inputs.items()}
            
            # Predict
            with torch.no_grad():
                outputs = self.model(**inputs)
            
            logits = outputs.logits
            probabilities = torch.softmax(logits, dim=-1)
            predicted_id = torch.argmax(logits, dim=-1).item()
            predicted_label = self.id2label[predicted_id]
            confidence = probabilities[0][predicted_id].item()
            
            return predicted_label, confidence
            
        except Exception as e:
            print(f"❌ Error processing audio: {str(e)}")
            return None, 0.0
    
    def processing_thread(self):
        """Thread for processing audio chunks."""
        audio_buffer = np.array([], dtype=np.float32)
        chunk_samples = int(self.chunk_duration * self.sample_rate)
        overlap_samples = int(self.overlap * self.sample_rate)
        
        while self.is_running:
            try:
                # Get audio from queue
                if not self.audio_queue.empty():
                    new_audio = self.audio_queue.get()
                    audio_buffer = np.concatenate([audio_buffer, new_audio.flatten()])
                    
                    # Process when we have enough audio
                    if len(audio_buffer) >= chunk_samples:
                        # Extract chunk
                        chunk = audio_buffer[:chunk_samples]
                        
                        # Process the chunk
                        emotion, confidence = self.process_audio_chunk(chunk)
                        
                        # Update current emotion if confidence is high enough
                        if emotion and confidence >= self.threshold:
                            self.current_emotion = emotion
                            self.current_confidence = confidence
                            
                            # Display result
                            timestamp = datetime.now().strftime("%H:%M:%S")
                            confidence_indicator = "🟢" if confidence >= 0.8 else "🟡" if confidence >= 0.5 else "🟠"
                            print(f"🕐 {timestamp} | {confidence_indicator} {emotion:<12} | {confidence:.3f} ({confidence*100:.1f}%)")
                        
                        # Keep overlap for next chunk
                        if overlap_samples > 0 and len(audio_buffer) > chunk_samples:
                            audio_buffer = audio_buffer[chunk_samples - overlap_samples:]
                        else:
                            audio_buffer = audio_buffer[chunk_samples:]
                        
                        # Small delay to prevent overwhelming
                        time.sleep(0.1)
                        
            except Exception as e:
                print(f"❌ Error in processing thread: {str(e)}")
                time.sleep(0.5)
    
    def run(self):
        """Run the automatic real-time emotion detection."""
        self.is_running = True
        
        try:
            # Start processing thread
            processing_thread = threading.Thread(target=self.processing_thread)
            processing_thread.daemon = True
            processing_thread.start()
            
            # Start continuous audio streaming
            with sd.InputStream(
                callback=self.audio_callback,
                channels=1,
                samplerate=self.sample_rate,
                blocksize=int(self.sample_rate * 0.1)  # 100ms blocks
            ):
                print("✅ Audio stream started successfully!")
                
                # Keep running until interrupted
                while self.is_running:
                    time.sleep(0.1)
                    
        except KeyboardInterrupt:
            print("\n👋 Stopping automatic emotion recognition...")
            self.is_running = False
            print("✅ Automatic real-time speech emotion recognition stopped.")
            
        except Exception as e:
            print(f"❌ Error in main loop: {str(e)}")
            self.is_running = False
        
        finally:
            self.is_running = False
            print("🛑 All threads stopped. Goodbye!")

if __name__ == "__main__":
    detector = SimpleAutomaticSpeechEmotion()
    detector.run()