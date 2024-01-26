import React from "react";

function NewsCard({ title, image_url, summary, link, index }) {
  const shortSummary = summary
    .match(/\b\w+\b/g)
    .slice(0, 100)
    .join(" ");
  return (
    <div className="col">
      <div className="card">
        {/* 1 0 0 1 1 0 0 1 1 0 0 1 1 0 0 */}
        {/* 1 0 0 4 5 0 0 8 9 0 0 12 13 0 0 */}
        <img
          src={image_url}
          alt="news image"
          className={`
         ${index % 4 == 0 || index % 4 == 1 ? "h-50" : "h-30"} `}
        />
        <div className="card-body">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <h5 className="card-title news-title-buttom">{title}</h5>
          </a>
          <p className="card-text">{shortSummary}...</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
