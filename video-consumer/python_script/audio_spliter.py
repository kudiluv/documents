from typing import List
from pydub import AudioSegment
from math import ceil
from os import path


def split(filePath: str, limiter: int = 30) -> List[str]:
    filename, file_extension = path.splitext(filePath)
    audio = AudioSegment.from_file(filePath, format=file_extension[1:])

    audio_splits: List[AudioSegment] = []
    count_of_audios = ceil(len(audio) / 1000 / limiter)

    for i in range(count_of_audios):
        audio_splits.append(
                audio[i*limiter*1000:(i + 1)*limiter*1000]
            )

    result: List[str] = []
    for idx, audio in enumerate(audio_splits):
        new_file = f"./tmp/{idx}_audi_file.wav"
        audio.export(new_file, 'wav')
        result.append(new_file)

    return result
