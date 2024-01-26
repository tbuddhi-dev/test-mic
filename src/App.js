import React, { createContext, useState, useContext, useEffect } from "react";
import "popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import AppRoutes from "./routes";
import Header from "./layout/Header";
import BottomNavBar from "./layout/BottomNavBar";
import companyNewsData from "../src/data/company_news.json";
import companyData from "../src/data/multiple_company.json";
import { SentimentContextProvider } from "./components/MarketSentiment/SentimentContext";

const GlobalStateContext = createContext();

const App = () => {
  const [basename, setBasename] = useState("default-basename");

  const globalValues = {
    basename,
    setBasename,
    companyData,
    companyNewsData
  }

  console.log("companyNewsData", companyNewsData)
  console.log("companyData", companyData)
  
  return (
    <GlobalStateContext.Provider value={globalValues}>
      <SentimentContextProvider>
        <Router>
          <div className="app-container">
            <header>
              <Header />
            </header>
            <main>
              <AppRoutes />
            </main>
            <footer>
              <BottomNavBar />
            </footer>
          </div>
        </Router>
      </SentimentContextProvider>
    </GlobalStateContext.Provider>
  );
};

export const useData = () => {
  return useContext(GlobalStateContext);
};

export default App;
