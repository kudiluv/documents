from typing import List
import librosa
import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Tokenizer

# load model and tokenizer
tokenizer = Wav2Vec2Tokenizer.from_pretrained("facebook/wav2vec2-base-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")

def extract(paths: List[str]):
    # load any audio file of your choice
    collection_of_text = []
    for path in paths:

        speech, rate = librosa.load(path, sr=16000)

        input_values = tokenizer(speech, return_tensors='pt').input_values
        # Store logits (non-normalized predictions)
        with torch.no_grad():
            logits = model(input_values).logits

        # Store predicted id's
        predicted_ids = torch.argmax(logits, dim=-1)
        # decode the audio to generate text
        # Passing the prediction to the tokenzer decode to get the transcription
        transcription = tokenizer.batch_decode(predicted_ids)[0]
        collection_of_text.append(transcription)

    return ' '.join(collection_of_text)
