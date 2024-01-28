import React, { useState } from "react";
import vectorBtn from "../../assets/icons/vector.svg";

const SentimentDropdown = ({ handleSort }) => {
  // const sentiments = ["Most Positive", "Most Negative", "Recent News"];
  const sentiments = ["Most Positive", "Most Negative"];
  const [selectedSentiment, setSelectedSentiment] = useState("");

  const handleItemClick = (sentiment) => {
    setSelectedSentiment(sentiment);
    handleSort(sentiment);
  };

  return (
    <div className=" sentiment-btn">
      <button type="button" className="btn" placeholder="Sentiment">
        {selectedSentiment || "Sentiment"}
      </button>
      <img
        src={vectorBtn}
        type="button"
        className="btn btn-light dropdown-toggle dropdown-toggle-split vector-icon"
        id="dropdownMenuReference"
        data-bs-toggle="dropdown"
        // aria-expanded="false"
        data-bs-reference="parent"
        alt="dropdown"
      />
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {sentiments.map((sentiment, index) => (
          <li key={index}>
            <a
              className="dropdown-item"
              href=":javascript"
              onClick={() => handleItemClick(sentiment)}
            >
              {sentiment}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentimentDropdown;
