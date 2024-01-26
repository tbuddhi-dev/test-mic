import React, { useState, useEffect } from 'react'
import { useData } from '../../App'

const RequestDescription = ({ companyName }) => {
    const { companyData } = useData();
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

    const { request_description } = selectedCompany;

    return (
        <>
            <header>
                <h2 className='title-type-3'>Request Description </h2>
                <p className='sub-title-type-1'>New/Additional Exposure</p>
            </header>
            <div>
                <p className='req-description'>{request_description}</p>
            </div>
        </>
    )
}

export default RequestDescription
