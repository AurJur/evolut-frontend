import ReactDOM from "react-dom";
import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AddCustomer from "./add_customer/addCustomer";
import AddAcct from "./add_account/addAcct";
import MakeTrns from "./make_trns/makeTrns";
import DeleteAcct from "./delete_acct/deleteAcct";

class Main extends Component {
  handleOnClickInsideAddCstmrBody() {
    // console.log("Clicked inside MkTrns body.");
    ReactDOM.render(
      <AddCustomer />,
      document.getElementById("addCustomerBody")
    );
  }

  handleOnClickInsideAddAcctBody() {
    console.log("Clicked inside AddAcct body.");
    ReactDOM.render(<AddAcct />, document.getElementById("addAcctBody"));
  }

  handleOnClickInsideMkTrnsBody() {
    // console.log("Clicked inside MkTrns body.");
    ReactDOM.render(<MakeTrns />, document.getElementById("makeTrnsBody"));
  }

  handleOnClickInsideDltAcctBody() {
    // console.log("Clicked inside DltAcct body.");
    ReactDOM.render(<DeleteAcct />, document.getElementById("dltAcctBody"));
  }

  render() {
    return (
      <Accordion>
        <Card>
          <Accordion.Toggle as={Button} eventKey="addCustomer">
            Add Customer
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="addCustomer">
            <Card.Body
              onClick={this.handleOnClickInsideAddCstmrBody}
              id="addCustomerBody"
            >
              Click to add Customer.
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle
            as={Button}
            eventKey="addAcct"
            id="addAcctAccordion"
          >
            Add Account
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="addAcct">
            <Card.Body
              onClick={this.handleOnClickInsideAddAcctBody}
              id="addAcctBody"
            >
              Click to add an account.
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle
            as={Button}
            eventKey="makeTrns"
            id="makeTrnsAccordion"
          >
            Make Transaction
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="makeTrns">
            <Card.Body
              onClick={this.handleOnClickInsideMkTrnsBody}
              id="makeTrnsBody"
            >
              Click to make a transaction.
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle
            as={Button}
            eventKey="dltAcct"
            id="dltAcctAccordion"
          >
            Delete Account
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="dltAcct">
            <Card.Body
              onClick={this.handleOnClickInsideDltAcctBody}
              id="dltAcctBody"
            >
              Click to delete an account.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Main;
