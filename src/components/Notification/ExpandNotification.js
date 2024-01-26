import React from "react";
import { Row, Col, Button } from "react-bootstrap"; 
import Image from "react-bootstrap/Image"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

const ExpandNotification = ({ Item }) => {
  const renderList = (list) => (
    <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
      {list.map((point, index) => (
        <li key={index} className="extend-title-points ms-1 mt-1">{point}</li>
      ))}
    </ul>
  );

  return (
    <div className="">
      <Row className="justify-content-between">
        <Col></Col>
        <Col className="text-end">
          <Button className="button-edit">Edit</Button>
        </Col>
      </Row>
      <Row className="custom-row-expand-margin ms-4 mb-3 mt-2">
        <Col span={24}>
          <span className="d-flex align-items-center">
            <Image
              className="agenda-icon"
              src={`./Assets/agenda.png`}
              alt="agenda"
              style={{ border: "none" }}
            />
            <span className="extend-title ms-1">Agenda</span>
          </span>
          {renderList(Item.agenda)}
        </Col>
      </Row>

      <Row className="custom-row-expand-margin ms-4 mb-3">
        <Col span={24}>
          <span className="d-flex align-items-center">
            <Image
              className="key-discussions-icon"
              src={`./Assets/key-discussions.png`}
              alt="key-discussions"
              style={{ border: "none" }}
            />
            <span className="extend-title ms-1">Key Discussions</span>
          </span>
          {renderList(Item["key-discussions"])}
        </Col>
      </Row>

      <Row className="custom-row-expand-margin ms-4 mb-3">
        <Col span={24}>
          <span className="d-flex align-items-center">
            <Image
              className="concerns_and_responds-icon"
              src={`./Assets/concerns_and_responds.png`}
              alt="concerns_and_responds"
              style={{ border: "none" }}
            />
            <span className="extend-title ms-1">Concerns and Responds</span>
          </span>
          {renderList(Item.concerns_and_responds)}
        </Col>
      </Row>

      <Row className="custom-row-expand-margin ms-4 mb-3">
        <Col span={24}>
          <span className="d-flex align-items-center">
            <Image
              className="action_items-icon"
              src={`./Assets/action_items.png`}
              alt="action_items"
              style={{ border: "none" }}
            />
            <span className="extend-title ms-1">Action Items</span>
          </span>
          {renderList(Item.action_items)}
        </Col>
      </Row>
    </div>
  );
};

export default ExpandNotification;
