import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ToAccount from "./toAccount";
import { APIHOST, APIPORT } from "../../common/constants";
import { renderRequestStatus, sleep, reRender } from "../../common/functions";

class MakeTrns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      requestStatus: "ready",
      requestStatusText: "Ready",
      fromAccountList: [],
      toAccountList: [],
      selectedFromAccount: [],
      selectedToAccount: [],
      enteredAmount: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFromAccountChange = (event) => {
    let nam = event.target.name;
    let accId = event.target.value;
    const selectedFromAccount = this.getAccountById(accId);
    let rebuiltToAccountList = [...this.state.fromAccountList];
    let selectedFromAccountIndex = rebuiltToAccountList.indexOf(
      selectedFromAccount
    );
    rebuiltToAccountList.splice(selectedFromAccountIndex, 1);
    this.setState({ toAccountList: rebuiltToAccountList });
    this.setState({ [nam]: selectedFromAccount });
    this.setState({ selectedToAccount: rebuiltToAccountList[0] });
  };

  handleToAccountChange = (event) => {
    console.log("Is this called?");
    let nam = event.target.name;
    let accId = event.target.value;
    const selectedToAccount = this.getAccountById(accId);
    this.setState({ [nam]: selectedToAccount });
  };

  handleAmountChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

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
          APIHOST + APIPORT + "/transaction/make",
          {
            from: this.state.selectedFromAccount.id,
            to: this.state.selectedToAccount.id,
            amount: this.state.enteredAmount,
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
      reRender("Click to make a transaction.", "makeTrnsBody");
    }
  }

  componentDidMount() {
    axios
      .get(APIHOST + APIPORT + "/account/list")
      .then((res) => {
        let initialToAccountList = [...res.data.data.accounts];
        initialToAccountList.splice(0, 1);
        this.setState({ fromAccountList: res.data.data.accounts });
        this.setState({ toAccountList: initialToAccountList });
        this.setState({ selectedFromAccount: this.state.fromAccountList[0] });
        this.setState({ selectedToAccount: initialToAccountList[0] });
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getAccountById = (id) => {
    let foundedAccount = this.state.fromAccountList.find(
      (element) => element.id === id
    );
    return foundedAccount;
  };

  constructAcctForDisplay = (acct) => {
    return (
      acct.firstName +
      " " +
      acct.lastName +
      " " +
      acct.balance +
      "" +
      acct.currency +
      " " +
      acct.number
    );
  };

  renderToAccount() {
    return (
      <ToAccount
        value={this.state.selectedToAccount && this.state.selectedToAccount.id}
        handleToAccountChange={this.handleToAccountChange}
        constructAcctForDisplay={this.constructAcctForDisplay}
        toAccountList={this.state.toAccountList}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <Form.Group
            controlId="SelectFromAcct" // To ensure accessibility
          >
            <Form.Label>Select FROM account:</Form.Label>
            <Form.Control
              required
              type="text"
              as="select"
              onChange={this.handleFromAccountChange}
              name="selectedFromAccount"
            >
              {this.state.fromAccountList.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {this.constructAcctForDisplay(acc)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <React.Fragment>{this.renderToAccount()}</React.Fragment>
          <Form.Group
            controlId="amount" // To ensure accessibility
          >
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              required
              type="number"
              min="0"
              placeholder="eg. 123"
              onChange={this.handleAmountChange}
              name="enteredAmount"
            />
            <Form.Control.Feedback type="invalid">
              Please enter positive whole number.
            </Form.Control.Feedback>
          </Form.Group>
          <p>
            From: {this.constructAcctForDisplay(this.state.selectedFromAccount)}
            <br></br>
            To: {this.constructAcctForDisplay(this.state.selectedToAccount)}
            <br></br>
            Amount: {this.state.enteredAmount}
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {/* <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback> */}
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

export default MakeTrns;
