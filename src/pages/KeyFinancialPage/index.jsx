import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useData } from '../../App';
import ColumnChart from '../../components/ColumnChart';
import LineChartMarker from '../../components/LineChartMarker';
import PdfViewer from '../../components/PdfViewer';


const KeyFinancialPage = () => {
  const { name } = useParams();
  const { companyData } = useData();
  const [loaderSpin, setLoaderSpin] = useState(true);
  
  // Assuming you want to display the key financial data for the first company in the array
  const keyFinancialData = companyData && companyData.length > 0 ? companyData[0].key_financial : null;

  useEffect(() => {
    setTimeout(() => {
      setLoaderSpin(false);
    }, 2000);
  }, []);

  return (

    <div className='key-financial-page'>
      {
        loaderSpin ? (
        <div class="spinner-box">
          <div class="spinner-border jk-theme" role="status"> </div>
          <div className='jk-theme mt-2'> Loading...</div>
        </div>
      ) : (
      <div>
        {keyFinancialData && (
          <div className='chart-section'>
            <header className='mb-3'>
              <h2 className='title-type-3'>Key Financial</h2>
              {/* Display additional information here */}
            </header>
            <div className='visuals-wrapper d-flex'>
              <div className='revenue-chart-wrapper chart-separator'>
                <div>
                  <p className='sub-title-type-2 '>Revenue</p>
                </div>
                <ColumnChart setHorizontal={false} data={keyFinancialData.data.revenue} />
              </div>
              <div className='ebitda-chart-wrapper chart-separator'>
                <div>
                  <p className='sub-title-type-2 '>EBITDA</p>
                </div>
                <ColumnChart setHorizontal={false} data={keyFinancialData.data.ebidta} />
              </div>
              <div className='d-flex charts-wrapper'>
                <div className='cash-charts-wrapper'>
                  <div>
                    <p className='sub-title-type-2 '>Cash</p>
                  </div>
                  <LineChartMarker style={{ padding: 1 + 'rem' }} data={keyFinancialData.data.cash} />
                </div>
                <div className='shareholder-charts-wrapper'>
                  <div>
                    <p className='sub-title-type-2 '>Shareholders Funds</p>
                  </div>
                  <ColumnChart setHorizontal={true} data={keyFinancialData.data.shareholders_funds} style={{ marginBottom: '-30px'}} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>)}
        <div className='hr-wrap px-4'>
          <hr className='m-0' />
        </div>
        <PdfViewer companyName={name} />
      </div>
  );
};

export default KeyFinancialPage;
