import React, { useContext, useState, useEffect } from "react";
import SentimentResult from "./SentimentResult";
import SentimentButton from "./SentimentButton";
import NewsCards from "./NewsCards";
import Sunburst from "./Sunburst";
import SentimentContext from "./SentimentContext";
import { useParams } from "react-router-dom";
import testSelectedCompanyNews from "./testdata";
import { useData } from "../../App";
import chartData from "./data";

function MarketSentiment() {
  const { companyName } = useParams();
  const [selectedCompanyNews, setSelectedCompanyNews] = useState();
  const { companyNewsData } = useData();
  const [selectedChild, setSelectedChild] = useState();
  const [sunburstData, setSunburstData] = useState([]);
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    if (companyNewsData) {
      const foundCompany = companyNewsData.find(
        (company) => company.name.toLowerCase() === companyName.toLowerCase()
      );
      setSelectedCompanyNews(foundCompany);
      if (foundCompany) {
        setSelectedChild(foundCompany);
        setNewsList(foundCompany.news_list);
        const foundChartData = chartData.find(
          (data) => data.name === foundCompany.company_name
        );
        setSunburstData(foundChartData);
      }
    }
  }, [companyName, companyNewsData]);

  const handleCellClick = (label) => {
    if (label === selectedCompanyNews.company_name) {
      console.log(selectedCompanyNews.company_name);
      setSelectedChild(selectedCompanyNews);
      setNewsList(selectedCompanyNews.news_list);
    } else {
      selectedCompanyNews.children.forEach((child) => {
        if (child.company_name === label) {
          console.log(child.company_name);
          setSelectedChild(child);
          setNewsList(child.news_list);
        }
      });
    }
  };

  const handleSort = (sentiment) => {
    console.log(sentiment);
    // if (sentiment =="positive") {
    //   newsList.map((news) => news.score)
    // }
  };

  useEffect(() => {
    console.log(selectedChild);
  }, [selectedChild]);

  return (
    <div className="sentiment-wrapper">
      <section className="header-section section">
        <h2 className="title-type-3">Market Sentiment</h2>
        {selectedChild && (
          <h4 className="sub-title-type-1">
            Overall: <strong>{selectedChild.overall_score}</strong>
          </h4>
        )}
      </section>
      <section className="top-section  row d-flex flex-row">
        <div className="col-6">
          {" "}
          {}
          <SentimentResult selectedChild={selectedChild} />
        </div>
        <div className="col-6 sunburst-col">
          {selectedCompanyNews && (
            <Sunburst
              data={sunburstData}
              width="300"
              height="300"
              count_member="value"
              font_size={8}
              labelFunc={(node) => node.data.name}
              onCellClick={handleCellClick}
            />
          )}
        </div>
      </section>
      <div className="hr-wrap px-4 h-line-sentiment">
        <hr className="m-0" />
      </div>
      <section className="middle-section section d-flex justify-content-end">
        <SentimentButton handleSort={handleSort} />
      </section>
      <section className="buttom-section section">
        <NewsCards newsList={newsList} />
      </section>
    </div>
  );
}

export default MarketSentiment;
