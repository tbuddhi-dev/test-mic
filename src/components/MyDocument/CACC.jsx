import React, { useState, useEffect } from 'react'
import { useData } from '../../App'

const CACC = ({ companyName }) => {
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

    const { cacc_reason, cacc_status } = selectedCompany;

    return (
        <>
            <header>
                <h2 className='title-type-3'>CACC Review</h2>
                <p className='sub-title-type-1'>Status: {cacc_status}</p>
            </header>
            <div>
                <p>{cacc_reason}</p>
            </div>
        </>
    )
}

export default CACC
