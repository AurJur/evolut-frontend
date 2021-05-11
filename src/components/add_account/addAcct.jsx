import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import AddAccountDetails from "./addAccountDetails";
import { APIHOST, APIPORT } from "../../common/constants";
import { renderRequestStatus, sleep, reRender } from "../../common/functions";

class AddAcct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      requestStatus: "ready",
      requestStatusText: "Ready",
      allCustomers: [],
      selectedCustomerId: "...",
      defaultOption: { id: "...", str: "Select:" },
      currency: "EUR", // from child
      balance: "...", // from child
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectCustomerChange = (event) => {
    this.setState({ selectedCustomerId: event.target.value }, function () {
      this.setFormValidatedAfterSelectCustomerChange();
    });
  };

  setFormValidatedAfterSelectCustomerChange() {
    if (this.state.selectedCustomerId === "...") {
      this.setState({ validated: false });
    }
  }

  componentDidMount() {
    axios
      .get(APIHOST + APIPORT + "/customer/list")
      .then((res) => {
        // this.setState({ allCustomers: res.data.content });
        this.setState({ allCustomers: res.data.data.customers });
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderAccountDetails() {
    if (this.state.selectedCustomerId === "...") {
      return <React.Fragment></React.Fragment>;
    }
    return (
      <React.Fragment>
        <AddAccountDetails
          onCurrencyChange={this.handleCurrencyChange}
          onBalanceChange={this.handleBalanceChange}
        />

        <p>
          Customer: {this.state.selectedCustomerId}
          <br></br>
          Currency: {this.state.currency}
          <br></br>
          Balance: {this.state.balance}
        </p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <br></br>
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

  async handleSubmit(event) {
    this.setState({ validated: true });
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
          APIHOST + APIPORT + "/account/add",
          {
            personCode: this.state.selectedCustomerId,
            currency: this.state.currency,
            balance: this.state.balance,
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
      reRender("Click to add an account.", "addAcctBody");
    }
  }

  //////////////// this is from child: ////////////////
  handleCurrencyChange = (event) => {
    // let nam = event.target.name;
    let val = event.target.value;
    this.setState({ currency: val });
  };

  handleBalanceChange = (event) => {
    // let nam = event.target.name;
    let val = event.target.value;
    this.setState({ balance: val });
  };
  //////////////// end of child: ////////////////

  render() {
    return (
      <React.Fragment>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <Form.Group>
            <Form.Label>Select customer:</Form.Label>
            <Form.Control
              required
              type="text"
              as="select"
              onChange={this.handleSelectCustomerChange}
              name="selectedCustomerId"
            >
              <option
                key={this.state.defaultOption.id}
                value={this.state.defaultOption.id}
              >
                {this.state.defaultOption.str}
              </option>
              {this.state.allCustomers.map((cust) => (
                <option key={cust.personCode} value={cust.personCode}>
                  {cust.firstName} {cust.lastName} {cust.personCode}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <React.Fragment>{this.renderAccountDetails()}</React.Fragment>
        </Form>
        {/* <div>Customer: {this.state.selectedCustomerId}</div> */}
        {/* <div>Currency: {this.state.currency}</div> */}
        {/* <div>Balance: {this.state.balance}</div> */}
      </React.Fragment>
    );
  }
}

export default AddAcct;
