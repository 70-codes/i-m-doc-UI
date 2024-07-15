import React, { useEffect, useState } from "react";
import { Alert, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosWithHeader } from "../../api/axios";

const MedicalRecordsWithPrescriptions = () => {
  const { patientId } = useParams();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axiosWithHeader.get(
          `/patient-medical-records-with-prescriptions/${patientId}/`
        );
        setMedicalRecords(response.data.medical_records);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching medical records");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, [patientId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Medical Records with Prescriptions</h1>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {medicalRecords.length > 0 && (
        <Table striped bordered hover style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Symptoms</th>
              <th>Diagnosis Date</th>
              <th>Added By</th>
              <th>Prescriptions</th>
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.symptoms}</td>
                <td>{new Date(record.diagnosis_date).toLocaleString()}</td>
                <td>{record.added_by}</td>
                <td>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {record.prescriptions.map((prescription) => (
                      <li key={prescription.id}>
                        Medication: {prescription.medication}, Dosage:{" "}
                        {prescription.dosage}, Prescribed by:{" "}
                        {prescription.prescribed_by}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default MedicalRecordsWithPrescriptions;
