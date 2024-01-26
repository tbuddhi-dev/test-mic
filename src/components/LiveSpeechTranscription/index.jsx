import React, { useState, useEffect } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const LiveSpeechTranscription = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [speakerId, setSpeakerId] = useState('');

  useEffect(() => {
    let speechConfig;
    let audioConfig;
    let recognizer;

    const initializeSpeechSDK = () => {
      // Replace with your own Speech API key and region
      const subscriptionKey = '26810d137749413d8d4bb45351df28f4';
      const serviceRegion = 'eastus';

      speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
      audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      recognizer.recognizing = (_, event) => {
        setTranscription(event.result.text);
        setSpeakerId(event.result.speakerId || ''); // Speaker ID might be available during recognizing
        console.log("event.result", event.result)
      };

      recognizer.recognized = (_, event) => {
        setTranscription(event.result.text);
        setSpeakerId(event.result.speakerId || ''); // Speaker ID is available after recognition
      };

      recognizer.startContinuousRecognitionAsync();
    };

    const stopSpeechRecognition = () => {
      if (recognizer) {
        recognizer.stopContinuousRecognitionAsync();
      }
    };

    if (isListening) {
      initializeSpeechSDK();
    } else {
      stopSpeechRecognition();
    }

    return () => {
      stopSpeechRecognition();
    };
  }, [isListening]);

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  return (
    <div>
      <h1>Live Speech Transcription</h1>
      <div>
        <button onClick={toggleListening}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>
      <div>
        <h3>Transcription:</h3>
        <p>{transcription}</p>
      </div>
      <div>
        <h3>Speaker ID:</h3>
        <p>{speakerId}</p>
      </div>
    </div>
  );
};

export default LiveSpeechTranscription;
