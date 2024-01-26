import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useData } from '../../App'

const KeyFinancial = ({ companyName }) => {
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

    const { key_financial } = selectedCompany;

    const ebidtaData = key_financial?.data?.ebidta;
    const revenueData = key_financial?.data?.revenue;
    const shareholdersFundsData = key_financial?.data?.shareholders_funds;
    const cashData = key_financial?.data?.cash;


    return (
        <>
        <Link to={`/keyfinancial/${companyName}`}>
            <header>
                <h2 className='title-type-3'>Key Financial</h2>
                <p className='sub-title-type-1'>Debt-Service Coverage Ratio: 2.17x</p>
            </header>
            <div>
                <div className='value-row'>
                    <label htmlFor="EBITDA Growth">EBITDA Growth</label>
                    <span>{ebidtaData?.[0]?.toLocaleString()}</span>
                </div>
                <div className='value-row'>
                    <label htmlFor="EBITDA Growth">Revenue</label>
                    <span>{revenueData?.[0]?.toLocaleString()}</span>
                </div>
                <div className='value-row'>
                    <label htmlFor="EBITDA Growth">Shareholders Funds</label>
                    <span>{shareholdersFundsData?.[0]?.toLocaleString()}</span>
                </div>
                <div className='value-row'>
                    <label htmlFor="EBITDA Growth">Cash</label>
                    <span>{cashData?.[0]?.toLocaleString()}</span>
                </div>
            </div>
        </Link>
    </>
  )
}

export default KeyFinancial
