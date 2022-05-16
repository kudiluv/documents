import audio_extractor
import audio_spliter
import extract_text_from_wav
import server
import cleaner


def extract(data: str):
    audio_path = audio_extractor.from_video(data)
    audios = audio_spliter.split(audio_path)
    text = extract_text_from_wav.extract(audios)
    cleaner.clean_tmp()
    return text


server.listen(extract)
