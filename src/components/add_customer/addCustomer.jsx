import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { APIHOST, APIPORT } from "../../common/constants";
import { renderRequestStatus, sleep, reRender } from "../../common/functions";

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValidated: false,
      personCode: "",
      firstName: "",
      lastName: "",
      requestStatus: "ready",
      requestStatusText: "Ready",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  async handleSubmit(event) {
    this.setState({ formValidated: true });
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    if (form.checkValidity() === true) {
      event.preventDefault();
      const headers = {
        "Content-Type": "application/json",
      };
      await axios
        .post(
          APIHOST + APIPORT + "/customer/add",
          {
            personCode: this.state.personCode,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          },
          { headers }
        )
        .then((response) => {
          console.log(response);
          if (response.data.status.isSuccess) {
            this.setState({ requestStatus: "ok" });
          } else {
            this.setState({ requestStatus: "fail" });
          }
          this.setState({
            requestStatusText: response.data.status.messages[0],
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ requestStatus: "fail" });
          this.setState({ requestStatusText: "Failed" });
        });
      await sleep();
      reRender("Click to add Customer.", "addCustomerBody");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form
          noValidate
          validated={this.state.formValidated}
          onSubmit={this.handleSubmit}
        >
          <Form.Group
            controlId="EnterPersonCode" // To ensure accessibility
          >
            <Form.Label>Enter person code (4 digits):</Form.Label>
            <Form.Control
              required
              type="text"
              maxLength={4}
              placeholder="1234"
              onChange={this.handleChange}
              name="personCode"
            />
          </Form.Group>

          <Form.Group
            controlId="EnterFirstName" // To ensure accessibility
          >
            <Form.Label>Enter first name:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="John"
              onChange={this.handleChange}
              name="firstName"
            />
          </Form.Group>

          <Form.Group
            controlId="EnterLastName" // To ensure accessibility
          >
            <Form.Label>Enter last name:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Smith"
              onChange={this.handleChange}
              name="lastName"
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <p>
            Person code: {this.state.personCode}
            <br></br>
            First name: {this.state.firstName}
            <br></br>
            Last name: {this.state.lastName}
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <br></br>
        <React.Fragment>
          {renderRequestStatus(
            this.state.requestStatus,
            this.state.requestStatusText
          )}
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default AddCustomer;
