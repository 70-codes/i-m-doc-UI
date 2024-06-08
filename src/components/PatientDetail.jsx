import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Alert, Modal } from "react-bootstrap";
import { axiosWithHeader } from "../api/axios";
import { useNavigate } from "react-router-dom";
import BookAppointment from "./BookAppointment";
import ChargePatient from "./ChargePatient";

const PatientDetail = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState({});

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axiosWithHeader.get(`/patients/${patientId}/`);
        setPatient(response.data);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching patient details");
      }
    };

    fetchPatient();
  }, [patientId]);

  const navigate = useNavigate();

  const [showModalBook, setShowModalBook] = useState(false);

  const handleShowBook = () => setShowModalBook(true);
  const handleCloseBook = () => setShowModalBook(false);

  const [showModalCharge, setShowModalCharge] = useState(false);

  const handleShowModalCharge = () => setShowModalCharge(true);
  const handleCloseCharge = () => setShowModalCharge(false);
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <div className="mt-5">
        <h2>Patient Details</h2>
        <p>
          <strong>ID:</strong> {patient.id}
        </p>
        <p>
          <strong>Name:</strong> {patient.name}
        </p>
        <p>
          <strong>Phone Number:</strong> {patient.phone_number}
        </p>
        <p>
          <strong>Date of Birth:</strong> {patient.date_of_birth}
        </p>
      </div>
      <div className="d-flex justify-content-evenly mt-5">
        <Button
          onClick={handleGoBack}
          variant="outline-secondary"
          className="py-2"
        >
          Go Back
        </Button>
        <Button
          variant="outline-success"
          className="py-2"
          onClick={handleShowModalCharge}
        >
          Charge Patient
        </Button>
        <Button
          variant="outline-info"
          onClick={handleShowBook}
          className="py-2"
        >
          Book Appointment
        </Button>
      </div>
      <Modal show={showModalBook} onHide={handleCloseBook} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookAppointment patientId={patientId} />
        </Modal.Body>
      </Modal>
      <Modal show={showModalCharge} onHide={handleCloseCharge} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>Charge patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChargePatient />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PatientDetail;
