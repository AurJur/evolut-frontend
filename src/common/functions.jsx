import ReactDOM from "react-dom";
import React from "react";
import Alert from "react-bootstrap/Alert";

export const renderRequestStatus = (requestStatus, requestStatusText) => {
  switch (requestStatus) {
    case "ready":
      return <Alert variant="warning">{requestStatusText}</Alert>;
    case "fail":
      return <Alert variant="danger">{requestStatusText}</Alert>;
    case "ok":
      return <Alert variant="success">{requestStatusText}</Alert>;
    default:
      return <Alert variant="warning">Smth wrong...</Alert>;
  }
};

export const sleep = (milliseconds) => {
  if (milliseconds > 0) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  } else {
    return new Promise((resolve) => setTimeout(resolve, 7000));
  }
};

export const reRender = (text, elementId) => {
  ReactDOM.render(<div>{text}</div>, document.getElementById(elementId));
};
