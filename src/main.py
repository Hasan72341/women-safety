#!/usr/bin/env python3
"""
Main entry point for the Women Safety Application
"""

import sys
import os

# Add src directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from core.decision_engine import DecisionEngine
from vision.crowd_detector import CrowdDetector
from audio.speech_emotion_detector import SpeechEmotionDetector

def main():
    print("🛡️ Women Safety Application")
    print("=" * 40)
    
    # Initialize components
    print("Initializing components...")
    
    # For now, we'll just show the available modules
    print("Available modules:")
    print("  - Vision System (Crowd Detection)")
    print("  - Audio System (Speech Emotion Recognition)")
    print("  - Decision Engine (coming soon)")
    print("  - Emergency Response (coming soon)")
    
    print("\nTo run specific modules:")
    print("  python src/vision/crowd_detector.py")
    print("  python src/audio/speech_emotion_detector.py")
    print("  python src/audio/realtime_speech_emotion.py")
    
    print("\n🚀 Application framework initialized!")

if __name__ == "__main__":
    main()