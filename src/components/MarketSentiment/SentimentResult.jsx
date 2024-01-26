import React, { useContext } from "react";
import SentimentContext from "./SentimentContext";

function SentimentResult({ selectedChild }) {
  return (
    <div className="sentiment-results">
      {selectedChild && selectedChild.total_news !== 0 ? (
        <>
          <div>
            <div className="progress-div">
              <p>Very Positive</p>
              <div className="progress-row">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${selectedChild.perc_very_positive}%`,
                    }}
                    role="progressbar"
                    aria-valuenow={selectedChild.perc_very_positive}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p className="progress-value">
                  {selectedChild.count_very_positive}
                </p>
              </div>
            </div>
            <div className="progress-div">
              <p>Positive</p>
              <div className="progress-row">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${selectedChild.perc_positive}%`,
                    }}
                    role="progressbar"
                    aria-valuenow={selectedChild.perc_positive}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p className="progress-value">{selectedChild.count_positive}</p>
              </div>
            </div>
            <div className="progress-div">
              <p>Neutral</p>
              <div className="progress-row">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${selectedChild.perc_neutral}%`,
                    }}
                    role="progressbar"
                    aria-valuenow={selectedChild.perc_neutral}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p className="progress-value">{selectedChild.count_neutral}</p>
              </div>
            </div>
            <div className="progress-div">
              <p>Negative</p>
              <div className="progress-row">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${selectedChild.perc_negative}%`,
                    }}
                    role="progressbar"
                    aria-valuenow={selectedChild.perc_negative}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p className="progress-value">{selectedChild.count_negative}</p>
              </div>
            </div>
            <div className="progress-div">
              <p>Very Negative</p>
              <div className="progress-row">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${selectedChild.perc_very_negative}%`,
                    }}
                    role="progressbar"
                    aria-valuenow={selectedChild.perc_very_negative}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p className="progress-value">
                  {selectedChild.count_very_negative}
                </p>
              </div>
            </div>
          </div>
          <div className="summary-div">
            <p>{selectedChild.overall_summary}</p>
          </div>{" "}
        </>
      ) : (
        <div className="sentiment-score mt-2">
          <p>Market Sentiment details not found</p>
        </div>
      )}
    </div>
  );
}

export default SentimentResult;
