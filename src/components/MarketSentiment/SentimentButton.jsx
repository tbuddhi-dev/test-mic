import React, { useEffect, useState } from "react";
import vectorBtn from "../../assets/icons/vector.svg";

function SentimentButton({ handleSort }) {
  const sentiments = ["Most Positive", "Most Negative", "Recent News"];
  const [selectedSetiment, setSelectedSentiment] = useState("");
  const [dropdownSentiment, setDropdownSentiment] = useState(sentiments);

  const handleItemClick = (sentiment) => {
    setSelectedSentiment(sentiment);
    setDropdownSentiment((prevSentiments) => {
      const updatedSentiments = [...prevSentiments];
      const selectedIndex = updatedSentiments.findIndex(
        (item) => item === sentiment
      );
      if (selectedIndex !== -1) {
        updatedSentiments.splice(selectedIndex, 1);
      }
      if (selectedSetiment !== "Most Negative") {
        updatedSentiments.push(selectedSetiment);
      }
      return updatedSentiments;
    });
    handleSort(sentiment);
  };
  return (
    <div className="btn-group sentiment-btn">
      <button type="button" className="btn btn-light" placeholder="Sentiment">
        {selectedSetiment || "Sentiment"}
      </button>
      <img
        src={vectorBtn}
        type="button"
        className="btn btn-light dropdown-toggle dropdown-toggle-split vector-icon"
        id="dropdownMenuReference"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-reference="parent"
      />
      <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
        {dropdownSentiment.map((sentiment, index) => (
          <li key={index}>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleItemClick(sentiment)}
            >
              {sentiment}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SentimentButton;
