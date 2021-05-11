import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class ToAccount extends Component {
  //   state = {};
  render() {
    return (
      <React.Fragment>
        <Form.Group
          controlId="SelectToAcct" // To ensure accessibility
        >
          <Form.Label>Select TO account:</Form.Label>
          <Form.Control
            required
            value={this.props.value}
            type="text"
            as="select"
            onChange={this.props.handleToAccountChange}
            name="selectedToAccount"
          >
            {this.props.toAccountList.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {this.props.constructAcctForDisplay(acc)}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </React.Fragment>
    );
  }
}

export default ToAccount;
