import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Main from "./main";
import Col from "react-bootstrap/Col";
import "../css/App.css"; // čia veikia

function App() {
  const mystyle = {
    // color: "rgb(13,131,165)",
    // background: "rgb(240, 240, 240)",
  };

  return (
    <Container style={mystyle}>
      <Row>
        <Col
          style={{ background: "rgb(240, 240, 240)", paddingTop: 0.5 + "em" }}
          xs={5}
          sm={3}
        >
          <img src="./evolut_transparent.png" alt="Evolut logo" height="32" />
        </Col>
        <Col
          style={{
            background: "rgb(240, 240, 240)",
            textAlign: "right",
            paddingRight: 2.0 + "em",
            paddingTop: 0.5 + "em",
          }}
        >
          <h5>The highest level of bank evolution</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Main />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
