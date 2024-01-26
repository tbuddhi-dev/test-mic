import React from 'react'
import useSpeechRecognition from '../../hooks/useSpeechRecognitionHook'
import SpeechTranscription from '../../components/SpeechTranscription'
import LiveSpeechTranscription from '../../components/LiveSpeechTranscription'

const ActivityScreen = () => {
  const {text, isListening, startListening, stopListening, hasRecognitionSupport} = useSpeechRecognition()

  return (
    <div>
      ActivityScreen
      {/* { hasRecognitionSupport ? (
        <div>
          <button onClick={startListening}>Start listening</button>
          <div>
            {isListening ? <div>Browser is listing</div> : null}
          </div>
        </div>
      ) : (
          <div>This browser not support </div>
      )} */}
      <SpeechTranscription />
      {/* <LiveSpeechTranscription /> */}
    </div>
  )
}

export default ActivityScreen
