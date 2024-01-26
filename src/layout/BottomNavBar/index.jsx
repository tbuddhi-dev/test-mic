import React, { useState, useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import * as fuzzball from 'fuzzball';
import { Link, useNavigate } from 'react-router-dom';

import HomeIco from '../../assets/icons/home.svg'
import SettingIco from '../../assets/icons/settings.svg'
import NotifyIco from '../../assets/icons/notification.svg'
import MicIco from '../../assets/icons/mic.svg'
import BackArrowIco from '../../assets/icons/arrow_back_ios.svg'
import SpeakingIcon from "../../assets/pngs/Speaking.png";
import PauseIcon from "../../assets/pngs/Pause.png";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const [micState, setMicState] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [status, setStatus] = useState("");

  let pauseClickStartTime = 0;
  let intervalId = null;

  const handleClick = () => {
    setMicState((prevState) => (prevState === 0 ? 1 : prevState === 1 ? 2 : 1));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    let speechConfig;
    let audioConfig;

    const initializeSpeechSDK = async () => {
      // const subscriptionKey = "26810d137749413d8d4bb45351df28f4";
      // const subscriptionKey = "0eae3b85eed34dd5be9a934e4c95590b";
      // const subscriptionKey = "5615df6814d94e5f9f4a0b1fa9608f3d";
      const subscriptionKey = "63d7de94c5bd42dea7543029f10d2b6e";
      const serviceRegion = "eastus";

      speechConfig = sdk.SpeechConfig.fromSubscription(
        subscriptionKey,
        serviceRegion
      );
      audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      recognizer.recognizing = (_, event) => {
        setStatus(`Recognizing: ${event.result.text}`);
      };

      recognizer.recognized = (_, event) => {
        const newText = event.result.text;
        setTranscription((prev) => prev + " " + newText);
      };

      recognizer.startContinuousRecognitionAsync();

      return () => {
        recognizer.stopContinuousRecognitionAsync();
      };
    };
    const voiceCommandHandle = () => {
      const threshold = 70;
      let companies = ["YTL Corporation", "Winbond Properties"];
      let function_output = console.log(`Nope..... function`)

      let companyMatch = status.indexOf("let's look into");
      let companySearch = companyMatch !== -1 ? status.substring(companyMatch + "let's look into".length) : "";

      for (let company of companies) {
        let word = `let's look into ${company}`;
        // Use fuzzball to check fuzzy match
        
        if (fuzzball.partial_ratio(companySearch, word) >= threshold) {
          let function_output = console.log(`Opening ${company} page`);
          navigate(`/keyfinancial/YTL%20REIT%20MTN`);
          break;  // Stop searching if a match is found
        }
      }
    }

    if (micState === 1) {
      initializeSpeechSDK();
      // voiceCommandHandle()
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
  }, [micState]);

  const threshold = 70;
  let companies = ["YTL Corporation", "Winbond Properties", "MURNI LAPISAN"];
  let function_output = console.log(`Nope.....`)

  let companyMatch = status.indexOf("let's look into");
  let companySearch = companyMatch !== -1 ? status.substring(companyMatch + "let's look into".length) : "";

  for (let company of companies) {
    

    let word = `let's look into ${company}`;
    // Use fuzzball to check fuzzy match
    if (fuzzball.partial_ratio(companySearch, word) >= threshold) {
      let function_output = console.log(`Opening ${company} page`);
      if(company === "YTL Corporation"){
        navigate(`/document/YTL%20REIT%20MTN`);
      }
      if(company === "MURNI LAPISAN"){
        navigate(`/document/MURNI%20LAPISAN%20SDN%20BHD`);
      }
      // navigate(`/document/YTL%20REIT%20MTN`);
      break;  // Stop searching if a match is found
    }
  }

  const handleMouseDown = (e) => {
    pauseClickStartTime = Date.now();

    intervalId = setInterval(() => {
      const clickDuration = Date.now() - pauseClickStartTime;

      if (clickDuration >= 3000) {
        alert("Success");
        let cleanedText = transcription.replace(/([.\s,])undefined/g, '$1');
        console.log('Backend Data:', cleanedText)
        setMicState(0);
        clearInterval(intervalId);
      }
    }, 100);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId);
  };

  const renderMicIcon = () => {
    switch (micState) {
      case 0:
        return <img src={MicIco} alt="MicIco" />;
      case 1:
        return <img src={SpeakingIcon} alt="SpeakIcon" />;
      case 2:
        return (
          <img
            src={PauseIcon}
            alt="PauseIcon"
            onMouseDown={() => {
              handleMouseDown();
            }}
            onMouseUp={() => {
              handleMouseUp();
            }}
          />
        );
      default:
        return <img src={MicIco} alt="MicIco" />;
    }
  };

  // let cName = 'YTL REIT MTN'
  // const handleVoiceNavigate = () => {
  //   console.log("Test navigate")
  //   navigate(`/keyfinancial/YTL%20REIT%20MTN`);
  // }

  return (
    <div className='bottom-nav-wrapper'>
      <div className="go-back-arrow" onClick={handleGoBack}>
        <a>
          <span className='nav-ico'>
            <img src={BackArrowIco} alt="BackArrowIco" />
          </span>
        </a>
      </div>

      <div className='navbar-items'>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/">
              <span className='nav-ico'>
                <img src={HomeIco} alt="HomeIco" />
              </span>
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/notification">
              <span className='nav-ico'>
                <img src={NotifyIco} alt="NotifyIco" />
              </span>
              <span>Notification</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link >
              <span className='nav-ico'>
                <img src={SettingIco} alt="SettingIco" />
              </span>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* <div className='mic-ico-wrapper'>
        <span className='nav-ico'>
        <Link to="/voiceAction">
          <img src={MicIco} alt="MicIco" />
          </Link>
        </span>
      </div> */}
      {/* <button onClick={handleVoiceNavigate}>
        Test
      </button> */}
      <div
        className="mic-ico-wrapper"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <span className="nav-ico">{renderMicIcon()}</span>
      </div>
    </div>
  )
}

export default BottomNavBar
