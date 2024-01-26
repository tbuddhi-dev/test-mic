import React, { useState, useEffect } from "react";
import { useData } from "../../App";
import { Link } from "react-router-dom";

const CompanyInfo = ({ companyName }) => {
  const { companyData, companyNewsData } = useData();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyNews, setSelectedCompanyNews] = useState(null);

  useEffect(() => {
    if (companyData) {
      const foundCompany = companyData.find(
        (company) => company.name.toLowerCase() === companyName.toLowerCase()
      );
      setSelectedCompany(foundCompany);
    }
  }, [companyName, companyData]);

  useEffect(() => {
    if (companyNewsData) {
      const foundCompany = companyNewsData.find(
        (company) => company.name.toLowerCase() === companyName.toLowerCase()
      );
      setSelectedCompanyNews(foundCompany);
    }
  }, [companyName, companyNewsData]);

  if (!selectedCompany) {
    return <p>Company details not found</p>;
  }

  const { description } = selectedCompany;

  return (
    <>
      <div className="company-info-wrapper">
        <header>
          <h2 className="title-type-3">{companyName} </h2>
          <p className="sub-title-type-1">
            Construction l Property Dev l Cement l Hotels | Edu Solution
          </p>
        </header>
        <div>
          <ul>
            {description &&
              description.map((desc, index) => <li key={index}>{desc}</li>)}
          </ul>
        </div>
      </div>
      {selectedCompanyNews ? (
        <Link to={`/MarketSentiment/${companyName}`} className="sentiment-score mt-2">
          <div>
            <div className="wrap-box">
              <div className="progress-bars">
                <div className="mb-1">
                  <p>Very Positive</p>
                  <div className="progress-row">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${selectedCompanyNews.perc_very_positive}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={selectedCompanyNews.perc_very_positive}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="progress-value">
                      {selectedCompanyNews.count_very_positive}
                    </p>
                  </div>
                </div>

                <div className="mb-1">
                  <p>Positive</p>
                  <div className="progress-row">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${selectedCompanyNews.perc_positive}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={selectedCompanyNews.perc_positive}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="progress-value">
                      {selectedCompanyNews.count_positive}
                    </p>
                  </div>
                </div>

                <div className="mb-1">
                  <p>Neutral</p>
                  <div className="progress-row">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${selectedCompanyNews.perc_neutral}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={selectedCompanyNews.perc_neutral}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="progress-value">
                      {selectedCompanyNews.count_neutral}
                    </p>
                  </div>
                </div>

                <div className="mb-1">
                  <p>Negative</p>
                  <div className="progress-row">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${selectedCompanyNews.perc_negative}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={selectedCompanyNews.perc_negative}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="progress-value">
                      {selectedCompanyNews.count_negative}
                    </p>
                  </div>
                </div>

                <div className="mb-1">
                  <p>Very Negative</p>
                  <div className="progress-row">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${selectedCompanyNews.perc_negative}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={selectedCompanyNews.perc_negative}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    {/* Don't have very_negative in json */}
                    <p className="progress-value">
                      {selectedCompanyNews.count_negative}
                    </p>
                  </div>
                </div>
              </div>
              <div className="label-box">
                <span className="vertical-text">Market Sentiment</span>
              </div>
            </div>
          </div>{" "}
        </Link>
      ) : (
        <div className="sentiment-score mt-2">
          <p>Market Sentiment details not found</p>
        </div>
      )}
    </>
  );
};

export default CompanyInfo;
