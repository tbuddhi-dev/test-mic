import React, { useState, useEffect } from 'react';
import { useData } from "../../App";
import 'pdfjs-dist/build/pdf.worker.min.js';
import { Viewer } from '@react-pdf-viewer/core';
import { searchPlugin } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import sampleYTLPdf from "../../assets/pdf/YTL REIT MTN.pdf";
import sampleMurniPdf from "../../assets/pdf/MURNI LAPISAN SDN BHD.pdf";

const PdfViewer = ({ companyName }) => {
    const { companyData, companyNewsData } = useData();
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [pdfFile, setPdfFile] = useState();

    useEffect(() => {
        if (companyData) {
          const foundCompany = companyData.find(
            (company) => company.name === companyName
          );
          setSelectedCompany(foundCompany);
        }
      }, [companyName, companyData]);

      
    // Identify company name PDF
    useEffect(() => {
        if (companyName === 'YTL REIT MTN') {
            setPdfFile(sampleYTLPdf);
        } else if(companyName === 'MURNI LAPISAN SDN BHD') {
            setPdfFile(sampleMurniPdf);
        } else {
            setPdfFile(sampleYTLPdf);
        }
    }, [companyName]);

    const searchPluginInstance = searchPlugin({
        keyword: ['revenue', 'ebitda'],
    });
    const { ShowSearchPopoverButton } = searchPluginInstance;

    // Render Viewer only when pdfFile is defined
    return (
        <div className='pdfViewer-wrapper'>
            {pdfFile && <Viewer fileUrl={pdfFile} plugins={[searchPluginInstance]} />}
        </div>
    );
};

export default PdfViewer;
