import ReactDOM from "react-dom";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Child from "./childDelete";

class DeleteAcct extends Component {
  state = {
    childValue: "Original",
  };

  handleChangeInChild = (event) => {
    console.log("OK05");
    this.setState({ childValue: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <p style={{ color: "red" }}>
          UNDER CONSTRUCTION. NOT FUNCTIONAL AT THE MOMENT.
        </p>
        <Form.Control
          required
          type="text"
          placeholder="eg. Parent"
          onChange={this.handleChangeInParent}
        />
        <Child
          onChange={this.handleChangeInChild}
          childValue={this.state.childValue}
        />
        <p>Child value should be here: {this.state.childValue}</p>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<DeleteAcct />, document.getElementById("root"));

export default DeleteAcct;
