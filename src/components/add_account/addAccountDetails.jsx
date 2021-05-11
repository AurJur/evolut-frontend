import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class AddAccountDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <Form.Group controlId="exampleForm.SelectCurrency">
          <Form.Label>Select currency:</Form.Label>
          <Form.Control
            required
            type="text"
            as="select"
            // placeholder="EUR"
            onChange={this.props.onCurrencyChange}
            name="currency" // pridėta iš pvz w3school
          >
            {/* <option key="1" value="..."> */}
            {/* ... */}
            {/* </option> */}
            <option key="2" value="EUR">
              EUR
            </option>
            <option key="3" value="USD">
              USD
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.Balance">
          <Form.Label>Enter balance:</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="0"
            onChange={this.props.onBalanceChange}
            name="balance" // pridėta iš pvz w3school
          />
        </Form.Group>
      </React.Fragment>
    );
  }
}

export default AddAccountDetails;
