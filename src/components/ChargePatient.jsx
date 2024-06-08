import React, { useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { axiosWithHeader } from "../api/axios";

const ChargePatient = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paybillAccountNumber, setPaybillAccountNumber] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosWithHeader.post("/mpesa/submit/", {
        phone_number: phoneNumber,
        amount: amount,
        paybill_account_number: paybillAccountNumber,
      });
      setResponseMessage(response.data.status);
      setResponseStatus("success");
    } catch (error) {
      setResponseMessage("Error submitting payment request");
      setResponseStatus("danger");
    }
  };

  return (
    <div className="container mt-5">
      {responseMessage && (
        <Alert variant={responseStatus}>{responseMessage}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="phoneNumber">
          <FormLabel>Phone Number</FormLabel>
          <FormControl
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup controlId="amount">
          <FormLabel>Amount</FormLabel>
          <FormControl
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup controlId="paybillAccountNumber">
          <FormLabel>Paybill Account Number</FormLabel>
          <FormControl
            type="text"
            value={paybillAccountNumber}
            onChange={(e) => setPaybillAccountNumber(e.target.value)}
          />
        </FormGroup>
        <Button variant="outline-success" className="w-100 mt-3 " type="submit">
          Submit Payment Request
        </Button>
      </Form>
    </div>
  );
};

export default ChargePatient;
