import React, { useRef, useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const SpeechTranscription = () => {
  const audioFileInputRef = useRef(null);
  const [transcription, setTranscription] = useState('');

  const transcribeFromFile = async () => {
    const audioFileInput = audioFileInputRef.current;

    if (!audioFileInput || !audioFileInput.files || audioFileInput.files.length === 0) {
      console.error('No file selected');
      return;
    }

    const audioFile = audioFileInput.files[0];
    const speechConfig = sdk.SpeechConfig.fromSubscription('26810d137749413d8d4bb45351df28f4', 'eastus');
    const audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile);
    // const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

    const conversationTranscriber = new sdk.ConversationTranscriber(speechConfig, audioConfig);
    const pushStream = sdk.AudioInputStream.createPushStream();

    const readArrayBuffer = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsArrayBuffer(file);
      });
    };

    const arrayBuffer = await readArrayBuffer(audioFile);
    pushStream.write(arrayBuffer);
    pushStream.close();

    console.log('Transcribing from: ' + audioFile.name);

    conversationTranscriber.transcribed = (s, e) => {
      console.log('TRANSCRIBED: Text=' + e.result.text + ' Speaker ID=' + e.result.speakerId);
    const newTranscription = transcription + e.result.speakerId +' : ' + e.result.text;
      setTranscription(newTranscription);
    };

    // Start conversation transcription
    conversationTranscriber.startTranscribingAsync(
      () => {},
      (err) => {
        console.trace('err - starting transcription: ' + err);
      }
    );
  };

  return (
    <div>
      <h1>Speech Transcription</h1>
      <input type="file" ref={audioFileInputRef} accept="audio/*" />
      <button onClick={transcribeFromFile}>Transcribe</button>
      <div>
        <h3>Transcription:</h3>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default SpeechTranscription;
