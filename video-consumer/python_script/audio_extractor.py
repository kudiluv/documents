from aifc import Error
from moviepy.video.io.VideoFileClip import VideoFileClip
import os.path


def from_video(file_path: str):
    if not os.path.exists(file_path):
        raise Error('File ' + file_path + ' not found')
    video = VideoFileClip(file_path)
    audio_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'tmp/extracted_audio.wav')
    video.audio.write_audiofile(audio_path)
    return audio_path

