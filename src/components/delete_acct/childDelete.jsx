import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class Child extends Component {
  render() {
    return (
      <React.Fragment>
        <Form.Control
          required
          type="text"
          placeholder="eg. Child"
          onChange={this.props.onChange}
        />
        <p>ChildValue: {this.props.childValue}</p>
      </React.Fragment>
    );
  }
}

export default Child;
