import React, { useEffect, useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import * as fuzzball from 'fuzzball';

const IdentifyVoice = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [status, setStatus] = useState('');
  
    useEffect(() => {
      let speechConfig;
      let audioConfig;
  
      const initializeSpeechSDK = async () => {
        const subscriptionKey = '63d7de94c5bd42dea7543029f10d2b6e';
        const serviceRegion = 'eastus'; 
  
        speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
  
        const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  
        recognizer.recognizing = (_, event) => {
          setStatus(`Recognizing: ${event.result.text}`);
         };

  
        recognizer.recognized = (_, event) => {
          const newText = event.result.text;
          setTranscription((prev) => prev + ' ' + newText);
        };
  
        recognizer.startContinuousRecognitionAsync();
  
        return () => {
          recognizer.stopContinuousRecognitionAsync();
        };
      };
  
      if (isListening) {
        initializeSpeechSDK();
      }
  
      return () => {
        // Cleanup code
        if (audioConfig) {
          audioConfig.close();
        }
        if (speechConfig) {
          speechConfig.close();
        }
      };
    }, [isListening]);
  
    const toggleListening = () => {
      setIsListening((prev) => !prev);
    };


// LOGIC FUNCTION >>>>
    // const fuzzball = require('fuzzball');      // import * as fuzzball from 'fuzzball';
    const threshold = 70;
    let companies = ["YTL Corporation", "Winbond Properties"];
    let function_output = console.log(`Nope.....`)

    let companyMatch = status.indexOf("let's look into");
    let companySearch = companyMatch !== -1 ? status.substring(companyMatch + "let's look into".length) : "";

    for (let company of companies) {
        let word = `let's look into ${company}`;
        // Use fuzzball to check fuzzy match
        if (fuzzball.partial_ratio(companySearch, word) >= threshold) {
            console.log(`Opening ${company} page`);
            break;  // Stop searching if a match is found
        }
    }

    let features = ["Company Information", "Facilities", "Key Financials", "Request Description", "CACC review", "Security"];
    let featureMatch = status.indexOf("drill deep into");
    let featureSearch = featureMatch !== -1 ? status.substring(featureMatch + "drill deep into".length) : "";

    for (let feature of features) {
        let word = `drill deep into ${feature}`;
        // Use fuzzball to check fuzzy match
        if (fuzzball.partial_ratio(featureSearch, word) >= threshold) {
          console.log(`Highlight ${feature} section`);
            break;  // Stop searching if a match is found
        }
    }
// STOP HERE
  
    return (
      <div>
        <h1>Live Voice Recognition</h1>
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
          <h3>Status:</h3>
          <p>{status}</p>
          <h3>TEST:</h3> 
          <p>{function_output}</p>          
        </div>
      </div>
    );
  };

export default IdentifyVoice
