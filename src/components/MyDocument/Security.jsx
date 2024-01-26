import React, { useState, useEffect } from 'react'
import { useData } from '../../App'

const Security = ({ companyName }) => {
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

    const { security_description, security_cover} = selectedCompany;

    return (
        <>
            <header>
                <h2 className='title-type-3'>Security</h2>
                <p className='sub-title-type-1'>{security_cover}</p>
            </header>
            <div>
                <p>{security_description}</p>
            </div>
        </>
    )
}

export default Security
