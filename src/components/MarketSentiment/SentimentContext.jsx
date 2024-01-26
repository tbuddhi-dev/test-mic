import React, { createContext, useState, useEffect } from "react";
import testSelectedCompanyNews from "./testdata";
import { useData } from "../../App";
import chartData from "./data";


const SentimentContext = createContext();

export const SentimentContextProvider = ({ children }) => {
 

  const toggleTheme = () => {
    console.log("theme toggle");
   
  };

  return (
    <SentimentContext.Provider
      value={{
        toggleTheme,
       
      }}
    >
      {children}
    </SentimentContext.Provider>
  );
};

export default SentimentContext;
