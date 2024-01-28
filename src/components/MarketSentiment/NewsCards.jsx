import React from "react";
import NewsCard from "./NewsCard";

function NewsCards({ newsList }) {
  const firstNews = newsList && newsList.length !== 0 ? newsList[0] : {};
  const { title, summary, link, image_url } = firstNews;
  const shortSummary =
    summary &&
    summary
      .match(/\b\w+\b/g)
      .slice(0, 100)
      .join(" ");
  return (
    <>
      {newsList && newsList.length !== 0 ? (
        <div className="news-cards">
          <div>
            <div className="card card-wrapper-top ">
              <img
                className="card-img top-img"
                src={image_url}
                alt="news"
              />

              <div className="card-img-overlay wide-news-card">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <h5 className="card-title text-on-img">{title}</h5>
                </a>
              </div>
            </div>

            <div className="card-body  news-p">
              <p className="card-text ">{shortSummary}</p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 g-4 news-row">
            {newsList.slice(1).map((item, index) => (
              <NewsCard {...item} index={index + 1} key={index + 1} />
            ))}
          </div>
        </div>
      ) : (
        <div className="">
          <div className="not-found-news">Recent News Not Found</div>
        </div>
      )}
    </>
  );
}

export default NewsCards;
