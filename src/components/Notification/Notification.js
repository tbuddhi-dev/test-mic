import React, { useState } from "react";
import ExpandNotification from './ExpandNotification';
import { useData } from '../../App';
import { MessagesData } from "./Data";

const NotificationComponent = () => {
  const { meetingSummaryData } = useData();
  const [expandFirst, setExpandFirst] = useState(false);

  const calculateTimeDifference = (time) => {
    const currentTime = new Date();
    const meetingTime = new Date();
    const [hours, minutes] = time.split(":");
    meetingTime.setHours(hours, minutes);
    const difference = currentTime - meetingTime;
    
    // Calculate difference in various units
    const minutesDifference = Math.round(difference / (1000 * 60));
    const hoursDifference = Math.round(difference / (1000 * 60 * 60));
    const daysDifference = Math.round(difference / (1000 * 60 * 60 * 24));
    const weeksDifference = Math.round(daysDifference / 7);
    const monthsDifference = Math.round(daysDifference / 30);
    const yearsDifference = Math.round(daysDifference / 365);
    
    // Determine the appropriate unit
    if (minutesDifference < 60) {
        return `${minutesDifference} ${minutesDifference === 1 ? "minute" : "minutes"}`;
    } else if (hoursDifference < 24) {
        return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"}`;
    } else if (daysDifference < 7) {
        return `${daysDifference} ${daysDifference === 1 ? "day" : "days"}`;
    } else if (weeksDifference < 4) {
        return `${weeksDifference} ${weeksDifference === 1 ? "week" : "weeks"}`;
    } else if (monthsDifference < 12) {
        return `${monthsDifference} ${monthsDifference === 1 ? "month" : "months"}`;
    } else {
        return `${yearsDifference} ${yearsDifference === 1 ? "year" : "years"}`;
    }
};

  return (
    <div className="notification-page px-4 mt-4">

      {/* Dynamic Meeting Summary from FastAPI */}
      {meetingSummaryData && meetingSummaryData.length > 0 && (
      <div>
      {meetingSummaryData.map((item, index) => (
        <div
          key={index}
          className={`flex mb-3 message-strip mt-2 pb-3 ${expandFirst ? "cursor-pointer" : ""}`}
          onClick={() => setExpandFirst(!expandFirst)}
        >
          <div className="custom-row-margin">
            <div
              className="px-2 py-3 d-flex justify-content-between"
            >
              <div className="d-flex align-items-center">
                <img
                  className="message-icon"
                  src={`./Assets/message-icon-${expandFirst ? "dark" : "light"}.png`}
                  alt="message"
                  style={{ border: "none" }}
                />
                <span className="message-content ms-2">
                  Meeting summary and minutes are ready
                </span>
              </div>
              <span className="message-updated">{calculateTimeDifference(item.time)} ago</span>
            </div>
          </div>
          <div className="custom-row-margin ms-4">
            <span className="message-time ms-2">&#8226; {item.time}</span>
            <span className="message-date ms-4">&#8226; {item.date}</span>
            <span className="message-area ms-4">&#8226; {item.location}</span>
          </div>
          {expandFirst && <ExpandNotification Item={item} />}
        </div>
      ))}
      </div>
      )}

      {/* Static Meeting Summary */}
      {MessagesData.map((item, index) => (
        <div
          key={index}
          className={`flex mb-3 message-strip mt-2 pb-3 ${item.key === 1 ? "cursor-pointer" : ""}`}
          onClick={() => item.key === 1 && setExpandFirst(!expandFirst)}
        >
          <div className="custom-row-margin">
            <div
              className="px-2 py-3 d-flex justify-content-between"
            >
              <div className="d-flex align-items-center">
                <img
                  className="message-icon"
                  src={`./Assets/message-icon-${item.key === 1 && !expandFirst ? "dark" : "light"}.png`}
                  alt="message"
                  style={{ border: "none" }}
                />
                <span className="message-content ms-2">
                  {item.messageContent}
                </span>
              </div>
              <span className="message-updated">{item.messageUpdated}</span>
            </div>
          </div>
          <div className="custom-row-margin ms-4">
            <span className="message-time ms-2">&#8226; {item.messageTime}</span>
            <span className="message-date ms-4">&#8226; {item.messageDate}</span>
            <span className="message-area ms-4">&#8226; {item.messagePlace}</span>
          </div>
          {expandFirst && item.key === 1 && <ExpandNotification Item={item} />}
        </div>
      ))}
    </div>
  );
};

export default NotificationComponent;
