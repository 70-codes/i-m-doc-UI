import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { axiosWithHeader } from "../api/axios";
import { useNavigate } from "react-router-dom";

const PatientDetailsDoc = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState({});
  const [medicalRecord, setMedicalRecord] = useState({
    symptoms: "",
    diagnosis_date: "",
  });
  const [prescription, setPrescription] = useState({
    medication: "",
    dosage: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [medicalRecordId, setMedicalRecordId] = useState(null);

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

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMedicalRecordSubmit = async (e) => {
    e.preventDefault();
    console.log(medicalRecord);
    try {
      const response = await axiosWithHeader.post(
        `/add-medical-record/${patientId}/`,
        medicalRecord
      );
      setMedicalRecordId(response.data.id);
      setSuccess("Medical record added successfully");
      setError(null);
    } catch (error) {
      setError("An error occurred while adding medical record");
      setSuccess(null);
    }
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    console.log(prescription);
    if (!medicalRecordId) {
      setError("Please add a medical record first");
      return;
    }
    try {
      await axiosWithHeader.post(`/create-prescription/${medicalRecordId}/`, {
        medication: prescription.medication,
        dosage: prescription.dosage,
      });
      setSuccess("Prescription added successfully");
      setError(null);
    } catch (error) {
      setError("An error occurred while adding prescription");
      setSuccess(null);
    }
  };

  useEffect(() => {
    // Clear error and success states after 2 seconds
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 2000);

    // Clean up timer on component unmount
    return () => clearTimeout(timer);
  }, [error, success]);

  return (
    <div className="container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Card className="mt-5">
        <Card.Body>
          <Card.Title>Patient Details</Card.Title>
          <Card.Text>
            <strong>Name:</strong> {patient.name}
          </Card.Text>
          <Card.Text>
            <strong>Phone Number:</strong> {patient.phone_number}
          </Card.Text>
        </Card.Body>
      </Card>

      <Form onSubmit={handleMedicalRecordSubmit} className="mt-5">
        <Form.Group controlId="formMedicalRecord">
          <Form.Label>Medical Record</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={medicalRecord.symptoms}
            onChange={(e) =>
              setMedicalRecord((prevState) => ({
                ...prevState,
                symptoms: e.target.value,
              }))
            }
            required
          />
        </Form.Group>
        {/* Add input field for diagnosis_date */}
        <Form.Group controlId="formDiagnosisDate">
          <Form.Label>Diagnosis Date</Form.Label>
          <Form.Control
            type="date"
            value={medicalRecord.diagnosis_date}
            onChange={(e) =>
              setMedicalRecord((prevState) => ({
                ...prevState,
                diagnosis_date: e.target.value,
              }))
            }
            required
          />
        </Form.Group>
        <Button variant="outline-info" type="submit" className="mt-3">
          Add Medical Record
        </Button>
      </Form>

      <Form onSubmit={handlePrescriptionSubmit} className="mt-5">
        <Form.Group controlId="formPrescription">
          <Form.Label>Prescription</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={prescription.medication}
            onChange={(e) =>
              setPrescription((prevState) => ({
                ...prevState,
                medication: e.target.value,
              }))
            }
            required
          />
        </Form.Group>
        <Form.Group controlId="formDosage">
          <Form.Label>Dosage</Form.Label>
          <Form.Control
            type="text"
            value={prescription.dosage}
            onChange={(e) =>
              setPrescription((prevState) => ({
                ...prevState,
                dosage: e.target.value,
              }))
            }
            required
          />
        </Form.Group>
        <Button variant="outline-info" type="submit" className="mt-3">
          Add Prescription
        </Button>
      </Form>

      <Button
        variant="outline-secondary"
        onClick={handleGoBack}
        className="mt-5"
      >
        Go Back
      </Button>
    </div>
  );
};

export default PatientDetailsDoc;
