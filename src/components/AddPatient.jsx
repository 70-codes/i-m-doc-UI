import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { axiosWithHeader } from "../api/axios";

const AddPatient = () => {
  const role = localStorage.getItem("role");

  const [patientData, setPatientData] = useState({
    name: "",
    phone_number: "",
    role: role,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setPatientData((oldData) => ({
      ...oldData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosWithHeader.post("/add_patient/", patientData);
      setSuccess("Patient created successfully");
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setSuccess(null);
      } else {
        setError("An error occurred");
        setSuccess(null);
      }
    }
    console.log(patientData);
    // console.log(localStorage.getItem("access"));
  };

  // if (role !== "receptionist" ||) {
  //   return <Alert variant="danger">Permission denied</Alert>;
  // }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone_number"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Patient
        </Button>
      </Form>
    </div>
  );
};

export default AddPatient;
