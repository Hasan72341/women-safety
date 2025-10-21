import cv2
import numpy as np
import socket
import time
import json
import os
from ultralytics import YOLO
import pygame
import sys
import shutil
from cryptography.fernet import Fernet
import sounddevice as sd

people_m = YOLO("yolov8n.pt")
poses_m = YOLO("yolov8n-pose.pt")

th_crowd = 5
wait = 60
last_alerted = 0

alert_Hz = 2000 
alert_time = 800  

th_motion = 5000
th_audio = 0.06

snapshots = False   
d_log = "snapshots"
os.makedirs(d_log, exist_ok=True)

ip_UDP = "broadcast"
port_UDP = 5005
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

key_f = Fernet.generate_key()
cipher_f = Fernet(key_f)
cas_face = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
def pic_blur(fr):
    gray = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)
    faces = cas_face.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        face = fr[y:y+h, x:x+w]
        blur = cv2.GaussianBlur(face, (49, 49), 30)
        fr[y:y+h, x:x+w] = blur
    return fr
def crowd_risk(fr, p_b):
    n_people = len(p_b)
    if n_people < th_crowd:
        return False
    risk = 0
    final_pose = poses_m(fr)
    for p in final_pose:
        for box in p.boxes:
            if hasattr(box, "keypoints") and len(box.keypoints) >= 2:
                hand_y = box.keypoints[0][1]
                sh_y = box.keypoints[1][1]
                if hand_y < sh_y:
                    risk += 1
    return risk / max(1, n_people) > 0.3

def motion_risk(prev_fr, curr_fr):
    if prev_fr is None:
        return False
    gray_prev = cv2.cvtColor(prev_fr, cv2.COLOR_BGR2GRAY)
    gray_curr = cv2.cvtColor(curr_fr, cv2.COLOR_BGR2GRAY)
    diff = cv2.absdiff(gray_prev, gray_curr)
    motion = np.sum(diff) / 255
    return motion > th_motion
def audio_risk(dur=0.5, fs=16000):
    try:
        record = sd.rec(int(dur * fs), samplerate=fs, channels=1)
        sd.wait()
        ampl_max = np.max(np.abs(record))
        return ampl_max > th_audio
    except Exception:
        return False

def alert(message, metadata):
    encry = cipher_f.encrypt(json.dumps(metadata).encode())
    sock.sendto(encry, (ip_UDP, port_UDP))

def play_beep(freq=alert_Hz, duration_ms=alert_time):
    """Cross-platform beep: use winsound on Windows, pygame if available,
    otherwise fallback to system players (afplay/aplay) when present.
    """
    # Try Windows winsound
    try:
        if sys.platform.startswith("win"):
            import winsound
            winsound.Beep(int(freq), int(duration_ms))
            return
    except Exception:
        pass

    # Try pygame synthesis
    try:
        # initialize mixer if needed
        if not pygame.get_init():
            pygame.init()
        fs = 16000
        duration = float(duration_ms) / 1000.0
        t = np.linspace(0, duration, int(fs * duration), False)
        wave = 0.5 * np.sin(2 * np.pi * float(freq) * t)
        audio = np.int16(wave * 32767)
        # Make a sound and play
        snd = pygame.sndarray.make_sound(audio)
        snd.play()
        # wait for sound to finish
        pygame.time.delay(int(duration_ms) + 50)
        return
    except Exception:
        pass

    # Fallback to system players (macOS: afplay, Linux: aplay)
    try:
        if sys.platform == "darwin" and shutil.which("afplay"):
            # play a system sound
            os.system("afplay /System/Library/Sounds/Glass.aiff")
            return
        if sys.platform.startswith("linux") and shutil.which("aplay"):
            os.system("aplay /usr/share/sounds/alsa/Front_Center.wav || true")
            return
    except Exception:
        pass
def meta_log(metadata):
    with open(os.path.join(d_log, "alerts_log.json"), "a") as f:
        json.dump(metadata, f)
        f.write("\n")


capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
prev_fr = None

latest_alert = "No Alerts"
alert_color = (0, 255, 0)
print("Women Safety System Running....")

while True:
    ret, fr = capture.read()
    if not ret:
        break

    res = people_m(fr, conf=0.3)
    p_b = [b for b in res[0].boxes if people_m.names[int(b.cls[0])] == "person"]
    ann_fr = res[0].plot()

    rsky_cr = len(p_b) >= th_crowd and crowd_risk(fr, p_b)
    motion = motion_risk(prev_fr, fr)
    audio_alert = audio_risk()

    modalities = [rsky_cr, motion, audio_alert]
    if sum(modalities) >= 2:
        pres_time = time.time()
        if pres_time - last_alerted > wait:
            play_beep(alert_Hz, alert_time)
            timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(pres_time))

            metadata = {
                "timestamp": timestamp,
                "n_people": len(p_b),
                "risky_pose": rsky_cr,
                "motion": motion,
                "audio_alert": audio_alert}

            if snapshots:
                safe_fr = pic_blur(ann_fr.copy())
                snap_path = os.path.join(d_log, f"blur_{int(pres_time)}.jpg")
                cv2.imwrite(snap_path, safe_fr)
                metadata["snapshot_path"] = snap_path

            alert("Risk Detection:", metadata)
            meta_log(metadata)

            latest_alert = f"Alert at: {timestamp}"
            alert_color = (0, 0, 255)
            last_alerted = pres_time
            print(f"[Alert at:] {metadata}")

    dashboard = np.zeros((300, 640, 3), dtype=np.uint8)
    cv2.putText(dashboard, f"People : {len(p_b)}", (20, 60),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    cv2.putText(dashboard, f"Motion : {'YES' if motion else 'NO'}", (20, 110),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,0), 2)
    cv2.putText(dashboard, f"Audio : {'HIGH' if audio_alert else 'OK'}", (20, 160),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255,165,0), 2)
    cv2.putText(dashboard, f"Pose Risk : {'YES' if rsky_cr else 'NO'}", (20, 210),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,255), 2)
    cv2.putText(dashboard, f"Alert at : {latest_alert}", (20, 260),
                cv2.FONT_HERSHEY_SIMPLEX, 0.9, alert_color, 2)

    cv2.imshow("Live Camera", ann_fr)
    cv2.imshow("Safety Dashboard", dashboard)
    prev_fr = fr.copy()
    key_f = cv2.waitKey(1) & 0xFF
    if key_f == 27:  # ESC
        break
    elif key_f == ord('e'):  # manual emergency
        play_beep(alert_Hz, alert_time)
        latest_alert = "Manual Emergency!"
        alert_color = (0, 0, 255)
        print("Emergency triggered by the user....")

capture.release()
cv2.destroyAllWindows()
