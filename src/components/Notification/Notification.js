import React, { useState } from "react";
import ExpandNotification from './ExpandNotification';
import { MessagesData } from "./Data";

const NotificationComponent = () => {
  const [expandFirst, setExpandFirst] = useState(false);

  return (
    <div className="notification-page px-4 mt-4">
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
