import React, { useState, useEffect } from 'react'
import { useData } from '../../App'
import ArrowUp from '../../assets/icons/arrow_up.svg'
import ArrowRight from '../../assets/icons/arrow_right.svg'
import ArrowDown from '../../assets/icons/arrow_down.svg'

const Facilities = ({ companyName }) => {
  const { companyData } = useData()
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    if (companyData) {
      const foundCompany = companyData.find((company) => company.name.toLowerCase() === companyName.toLowerCase());
      setSelectedCompany(foundCompany);
    }
  }, [companyName, companyData]);

  if (!selectedCompany) {
    return <p>Company details not found</p>;
  }

  const {
    facility_rc_before,
    facility_rc_delta,
    facility_mtf_before,
    facility_mtf_delta,
    facility_tl_before,
    facility_tl_delta,
    facility_psl_before,
    facility_psl_delta,
    facility_htc_before,
    facility_htc_delta,
    facility_mtn_before,
    facility_mtn_delta,
    facility_cl_before,
    facility_cl_delta,
    facility_bg_before,
    facility_bg_delta,
    roce
  } = selectedCompany;

  const formatDeltaNumber = (num) => {
    const isNegative = num < 0;
  
    if (Math.abs(num) >= 1000000) {
      const formatted = (Math.abs(num) / 1000000).toFixed(1);
      const result = (isNegative ? '-' : '+') + (formatted.endsWith('.0') ? formatted.slice(0, -2) + 'M' : formatted + 'M');
      return result;
    }
  
    return isNegative ? '-' + Math.abs(num) : num;
  };
  
  const formatNumber = (num) => {
    if (num >= 1000000) {
      const formatted = (num / 1000000).toFixed(1);
      return formatted.endsWith('.0') ? formatted.slice(0, -2) + 'M' : formatted + 'M';
    }
    return num;
  };

  const getArrowImage = (delta) => {
    if (delta === 0) {
      return ArrowRight;
    } else if (delta > 0) {
      return ArrowUp;
    } else {
      return ArrowDown;
    }
  };

  return (
    <>
      <header>
        <h2 className='title-type-3'>Facilities</h2>
        <p className='sub-title-type-1'>Return of Capital Employed: {roce}%</p>
      </header>
      <div>
        <div className='row fc-row'>
          <div className='col'>RC</div>
          <div className='col'>{formatNumber(facility_rc_before)}</div>
          <div className='col img-arrow'>
            <img src={getArrowImage(facility_rc_delta)} alt="ArrowImage" />
          </div>
          <div className='col'>{formatDeltaNumber(facility_rc_delta)}</div>
        </div>
        <div className='row fc-row'>
          <div className='col'>MTF</div>
          <div className='col'>{formatNumber(facility_mtf_before)}</div>
          <div className='col img-arrow'>
            <img src={getArrowImage(facility_mtf_delta)} alt="ArrowImage" />
          </div>
          <div className='col'>{formatDeltaNumber(facility_mtf_delta)}</div>
        </div>
        <div className='row fc-row'>
          <div className='col'>TL</div>
          <div className='col'>{formatNumber(facility_tl_before)}</div>
          <div className='col img-arrow'>
            <img src={getArrowImage(facility_tl_delta)} alt="ArrowImage" />
          </div>
          <div className='col'>{formatDeltaNumber(facility_tl_delta)}</div>
        </div>
        <div className='row fc-row'>
          <div className='col'>PSL</div>
          <div className='col'>{formatNumber(facility_psl_before)}</div>
          <div className='col img-arrow'>
            <img src={getArrowImage(facility_psl_delta)} alt="ArrowImage" />
          </div>
          <div className='col'>{formatDeltaNumber(facility_psl_delta)}</div>
        </div>
        <div className='row fc-row'>
          <div className='col'>HTC</div>
          <div className='col'>{formatNumber(facility_htc_before)}</div>
          <div className='col img-arrow'>
            <img src={getArrowImage(facility_htc_delta)} alt="ArrowImage" />
          </div>
          <div className='col'>{formatDeltaNumber(facility_htc_delta)}</div>
        </div>
        <div className='row fc-row'>
          <div className='col'>MTN</div>
          <div className='col'>{formatNumber(facility_mtn_before)}</div>
          <div className='col img-arrow'>
            <img src={getArrowImage(facility_mtn_delta)} alt="ArrowImage" />
          </div>
          <div className='col'>{formatDeltaNumber(facility_mtn_delta)}</div>
        </div>
        <div className='row fc-row'>
          <div className='col'>CL</div>
          <div className='col'>{formatNumber(facility_cl_before)}</div>
          <div className='col img-arrow'>
            <img src={getArrowImage(facility_cl_delta)} alt="ArrowImage" />
          </div>
          <div className='col'>{formatDeltaNumber(facility_cl_delta)}</div>
        </div>
        <div className='row fc-row'>
          <div className='col'>BG</div>
          <div className='col'>{formatNumber(facility_bg_before)}</div>
          <div className='col img-arrow'>
            <img src={getArrowImage(facility_bg_delta)} alt="ArrowImage" />
          </div>
          <div className='col'>{formatDeltaNumber(facility_bg_delta)}</div>
        </div>
      </div>
    </>
  )
}

export default Facilities
