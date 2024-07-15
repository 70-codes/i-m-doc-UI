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

const ChargePatient = ({ patientId }) => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(amount, phone);
    try {
      const response = await axiosWithHeader.post(`/stkpush/${patientId}/`, {
        amount: amount,
        phone: phone,
      });
      setResponseMessage(response.data.message);
      setResponseStatus("success");
    } catch (error) {
      setResponseMessage(
        error.response?.data?.error || "Error submitting payment request"
      );
      setResponseStatus("danger");
    }
  };

  return (
    <div className="container mt-5">
      {responseMessage && (
        <Alert variant={responseStatus}>{responseMessage}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="amount">
          <FormLabel>Amount</FormLabel>
          <FormControl
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup controlId="phone">
          <FormLabel>Phone Number</FormLabel>
          <FormControl
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </FormGroup>
        <Button variant="outline-success" className="w-100 mt-3" type="submit">
          Submit Payment Request
        </Button>
      </Form>
    </div>
  );
};

export default ChargePatient;
