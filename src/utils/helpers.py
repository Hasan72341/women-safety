"""
Utility functions for the Women Safety Application
Contains helper functions and common utilities
"""

import os
import json
from datetime import datetime

def get_timestamp():
    """Get current timestamp in ISO format"""
    return datetime.now().isoformat()

def save_evidence(data, filename):
    """Save evidence data to file"""
    filepath = os.path.join("evidence", filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    with open(filepath, 'w') as f:
        json.dump(data, f)
    
    return filepath

def load_config(config_file="config.json"):
    """Load configuration from file"""
    try:
        with open(config_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def format_threat_level(level):
    """Format threat level for display"""
    levels = {
        "LOW": "🟢 LOW",
        "MEDIUM": "🟡 MEDIUM",
        "HIGH": "🔴 HIGH",
        "CRITICAL": "🚨 CRITICAL"
    }
    return levels.get(level, level)

# Example usage
if __name__ == "__main__":
    print("Utils module loaded successfully!")
    print(f"Current timestamp: {get_timestamp()}")