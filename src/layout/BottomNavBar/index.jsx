import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from '../../App';
import HomeIco from "../../assets/icons/home.svg";
import SettingIco from "../../assets/icons/settings.svg";
import NotifyIco from "../../assets/icons/notification.svg";
// import MicIco from "../../assets/icons/mic.svg";
import BackArrowIco from "../../assets/icons/arrow_back_ios.svg";
import MicIcon from "../../assets/pngs/Mic.png";
import PauseIcon from "../../assets/pngs/Pause.png";
import StopIcon from "../../assets/pngs/Stop.png";
import PlayIcon from '../../assets/pngs/Play.png';
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import * as fuzzball from 'fuzzball';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const { setMeetingSummaryData } = useData();
  const [micState, setMicState] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [status, setStatus] = useState("");
  const [showPausePlayButtons, setShowPausePlayButtons] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false)


  const handleMicClick = () => {
    setShowPausePlayButtons(true);
    setMicState(true);
  };

  const handlePauseClick = () => {
    setShowPlayButton(true);
    setMicState(false);
  };


  const handlePlayClick = () => {
    setShowPlayButton(false);
    setMicState(true);
  };

  const handleStopClick = async () => {
    setShowPausePlayButtons(false);
    setMicState(false);

    setTimeout(() => {
      // let transcript = "message transcription YTL Key Financial"
      let transcript = transcription.replace(/([.\s,])undefined/g, '$1');
      alert('Audio Sent', transcript);
      console.log('Audio Data:', transcript);

      // TEMP : FAST API Implementation 
      try {
        fetch('http://192.168.30.87:8080/meeting_summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transcript }),
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }).then(data => {
          setMeetingSummaryData(data);
          console.log("Meeting Summary Recorded");
          console.log("data", data);
        }).catch(error => {
          console.error('Error uploading transcript:', error);
        });
      } catch (error) {
        console.error('Error uploading transcript:', error);
      }
    }, 1000);
  };
  useEffect(() => {
    let recognizer;

    const initializeSpeechSDK = async () => {
      const subscriptionKey = "63d7de94c5bd42dea7543029f10d2b6e";
      const serviceRegion = "eastus";
      const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

      recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      recognizer.recognizing = (_, event) => {
        setStatus(`Recognizing: ${event.result.text}`);
      };

      recognizer.recognized = (_, event) => {
        const newText = event.result.text;
        setTranscription((prev) => prev + " " + newText);
      };

      recognizer.startContinuousRecognitionAsync();
    };

    if (micState) {
      initializeSpeechSDK();
    }

    return () => {
      // Cleanup code
      if (recognizer) {
        recognizer.stopContinuousRecognitionAsync();
        recognizer.close();
      }
    };
  }, [micState]);


  useEffect(() => {
    const threshold = 70;
    const companies = ["YTL Corporation", "Winbond Properties", "MURNI LAPISAN"];

    let companyMatch = status.indexOf("let's look into");
    let companySearch = companyMatch !== -1 ? status.substring(companyMatch + "let's look into".length) : "";

    for (let company of companies) {
      let word = `let's look into ${company}`;
      // Use fuzzball to check fuzzy match
      if (fuzzball.partial_ratio(companySearch, word) >= threshold) {
        console.log(`Opening ${company} page`);
        if (company === "YTL Corporation") {
          navigate(`/document/YTL%20REIT%20MTN`);
        }
        if (company === "MURNI LAPISAN") {
          navigate(`/document/MURNI%20LAPISAN%20SDN%20BHD`);
        }
        break;  // Stop searching if a match is found
      }
    }
  }, [status, navigate]);  // Add 'navigate' to dependencies if it's likely to change




  return (
    <div className="bottom-nav-wrapper">
      <div className="go-back-arrow">
        <Link to="/">
          <span className="nav-ico">
            <img src={BackArrowIco} alt="BackArrowIco" />
          </span>
        </Link>
      </div>

      <div className="navbar-items">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/">
              <span className="nav-ico">
                <img src={HomeIco} alt="HomeIco" />
              </span>
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Notification">
              <span className="nav-ico">
                <img src={NotifyIco} alt="NotifyIco" />
              </span>
              <span>Notification</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard">
              <span className="nav-ico">
                <img src={SettingIco} alt="SettingIco" />
              </span>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      {!showPausePlayButtons && (
        <div className="mic-div">
          <img
            src={MicIcon}
            alt="MicIco"
            onClick={handleMicClick}
            style={{ cursor: "pointer" }}
          />

        </div>
      )}
      {showPausePlayButtons && (
        <div className="flex">
          <img
            src={StopIcon}
            alt="MicIco"
            onClick={handleStopClick}
            className="ms-1"
            style={{ cursor: "pointer" }}
          />
          {
            showPlayButton ? <img
              src={PlayIcon}
              alt="MicIco"
              onClick={handlePlayClick}
              style={{ cursor: "pointer" }}
            /> :
              <img
                src={PauseIcon}
                alt="MicIco"
                onClick={handlePauseClick}
                style={{ cursor: "pointer" }}
              />
          }
        </div>
      )}
    </div>
  );
};

export default BottomNavBar;