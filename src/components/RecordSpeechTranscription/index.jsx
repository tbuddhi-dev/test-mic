import React, { useRef, useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const RecordSpeechTranscription = () => {
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const audioFile = new File([audioBlob], 'recordedAudio.wav', { type: 'audio/wav' });
      transcribeFromFile(audioFile);
      audioChunks.current = [];
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeFromFile = async (audioFile) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription('26810d137749413d8d4bb45351df28f4', 'eastus');
    const audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile);

    const conversationTranscriber = new sdk.ConversationTranscriber(speechConfig, audioConfig);

    console.log('Transcribing from: ' + audioFile.name);

    conversationTranscriber.transcribed = (s, e) => {
      console.log('TRANSCRIBED: Text=' + e.result.text + ' Speaker ID=' + e.result.speakerId);
      const newTranscription = transcription + e.result.speakerId + ' : ' + e.result.text;
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
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      <div>
        <h3>Transcription:</h3>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default RecordSpeechTranscription;
