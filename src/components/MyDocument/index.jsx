import React from "react";
import { useParams } from "react-router-dom";
import CompanyInfo from "./CompanyInfo";
import CACC from "./CACC";
import Security from "./Security";
import RequestDescription from "./RequestDescription";
import KeyFinancial from "./KeyFinancial";
import Facilities from "./Facilities";

const MyDocument = () => {
  const { name } = useParams();

  // console.info("Get company name", name);

  return (
    <div className="mydoc-wrapper">
      <section className="section-1 company-info">
        <CompanyInfo companyName={name} />
      </section>
      <div className="hr-wrap px-4">
        <hr className="m-0" />
      </div>
      <section className="section-2 d-flex">
        <div className="req-description-wrapper w-50">
          <RequestDescription companyName={name} />
        </div>
        <div className="facilities-wrapper">
          <Facilities companyName={name} />
        </div>
      </section>
      <div className="hr-wrap px-4">
        <hr className="m-0" />
      </div>
      <section className="section-3 d-flex">
        <div className="key-financial-wrapper">
          <KeyFinancial companyName={name} />
        </div>
        <div className="security-wrapper">
          <Security companyName={name} />
        </div>
      </section>
      <div className="hr-wrap px-4">
        <hr className="m-0" />
      </div>
      <section className="section-4">
        <div className="cacc-wrapper">
          <CACC companyName={name} />
        </div>
      </section>
    </div>
  );
};

export default MyDocument;
