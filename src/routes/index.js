import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import FileUploadScreen from "../components/FileUploadScreen";
import ScheduleScreen from "../components/ScheduleScreen";
import ActivityScreen from "../components/ActivityScreen";
import TabView from "../components/TabView";
import MyDocument from "../components/MyDocument";
import KeyFinancialPage from "../pages/KeyFinancialPage";
import MarketSentiment from "../components/MarketSentiment";
import NotificationComponent from "../components/Notification/Notification";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TabView />} />
      <Route path="/" element={<Outlet />}>
        <Route path="/document/:name" element={<MyDocument />} />
        <Route path="/keyfinancial/:name" element={<KeyFinancialPage />} />

        <Route
          path="/MarketSentiment/:companyName"
          element={<MarketSentiment />}
        />
        <Route path="/notification" element={<NotificationComponent />} />
        {/* <Route path="/dashboard" element={<FileUploadScreen />} />
        <Route path="/schedule" element={<ScheduleScreen />} />
        <Route path="/document/:name" element={<MyDocument />} />
        <Route path="/dashboard" element={<KeyFinancialPage />} /> */}
        <Route path="/voiceAction" element={<FileUploadScreen />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
