import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { axiosWithHeader } from "../api/axios";

const BookAppointment = ({ patientId }) => {
  const role = localStorage.getItem("role");

  const [appointmentData, setAppointmentData] = useState({
    appointment_date: "",
    status: "PENDING",
    role: role,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setAppointmentData((oldData) => ({
      ...oldData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(appointmentData);
    try {
      const response = await axiosWithHeader.post(
        `/book-appointment/${patientId}/`,
        appointmentData
      );
      setSuccess("Appointment booked successfully");
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
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAppointmentDate" className="mt-3">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="appointment_date"
            value={appointmentData.appointment_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formStatus" className="mt-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={appointmentData.status}
            onChange={handleChange}
            required
          >
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </Form.Control>
        </Form.Group>
        <Button
          variant="outline-info mt-3 w-100"
          type="submit"
          className="mt-3"
        >
          Book Appointment
        </Button>
      </Form>
    </div>
  );
};

export default BookAppointment;
