import React, { useEffect, useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const SpeakerVerificationComponent = () => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [enrollmentProfile, setEnrollmentProfile] = useState(null);

  let speechConfig;
  let audioConfig;

  const subscriptionKey = '26810d137749413d8d4bb45351df28f4';
  const serviceRegion = 'eastus'; 
  const locale = 'en-US';

  const enrollSpeaker = async () => {
    if (!enrollmentProfile) {
      setEnrollStatus('Please create an enrollment profile first.');
      return;
    }

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (_, event) => {
      setEnrollStatus(`Enrolling: ${event.result.text}`);
    };

    recognizer.recognized = (_, event) => {
      const newText = event.result.text;
      setEnrollStatus((prev) => prev + ' ' + newText);
    };

    try {
      setIsEnrolling(true);

      // Enroll the speaker using the provided audio stream
      const enrollResult = await recognizer.enrollProfileAsync(enrollmentProfile);
      setEnrollStatus(`(Enrollment result) Reason: ${sdk.ResultReason[enrollResult.reason]}`);
    } finally {
      setIsEnrolling(false);
    }
  };

  const verifySpeaker = async () => {
    if (!enrollmentProfile) {
      setVerificationStatus('Please create an enrollment profile first.');
      return;
    }

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (_, event) => {
      setVerificationStatus(`Verifying: ${event.result.text}`);
    };

    recognizer.recognized = (_, event) => {
      const newText = event.result.text;
      setVerificationStatus((prev) => prev + ' ' + newText);
    };

    try {
      setIsVerifying(true);

      // Verify the speaker using the provided audio stream
      const verificationResult = await recognizer.verifyProfileAsync(enrollmentProfile);
      setVerificationStatus(
        `(Verification result) Reason: ${sdk.ResultReason[verificationResult.reason]}`
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const createEnrollmentProfile = async () => {
    try {

      const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
      const client = new sdk.VoiceProfileClient(speechConfig);

      // Create a profile for text-independent identification
      const profile = await client.createProfileAsync(
        sdk.VoiceProfileType.TextIndependentIdentification,
        locale
      );

      setEnrollmentProfile(profile);
      setEnrollStatus(`Enrollment profile created. Profile ID: ${profile.profileId}`);
    } catch (error) {
      console.error('Error creating enrollment profile:', error);
      setEnrollStatus(`Error creating enrollment profile: ${error.message}`);
    }
  };

  useEffect(() => {
    const initializeSpeechSDK = async () => {

      speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
      audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

      return () => {
        if (audioConfig) {
          audioConfig.close();
        }
        if (speechConfig) {
          speechConfig.close();
        }
      };
    };


    initializeSpeechSDK();

    return () => {
      if (audioConfig) {
        audioConfig.close();
      }
      if (speechConfig) {
        speechConfig.close();
      }
    };
  }, [enrollmentProfile]);

  return (
    <div>
      <h1>Speaker Verification</h1>
      <div>
        <button onClick={createEnrollmentProfile}>Create Enrollment Profile</button>
      </div>
      <div>
        <button onClick={enrollSpeaker} disabled={!enrollmentProfile || isEnrolling}>
          Enroll Speaker
        </button>
        <p>Enrollment Status: {enrollStatus}</p>
      </div>
      <div>
        <button onClick={verifySpeaker} disabled={!enrollmentProfile || isVerifying}>
          Verify Speaker
        </button>
        <p>Verification Status: {verificationStatus}</p>
      </div>
    </div>
  );
};

export default SpeakerVerificationComponent;
