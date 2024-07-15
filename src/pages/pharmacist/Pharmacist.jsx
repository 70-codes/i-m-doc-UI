import React, { useEffect, useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { axiosWithHeader } from "../../api/axios";
// import { useNavigate } from "react-router-dom";
import "./Pharmacist.css";

const PharmacistView = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axiosWithHeader.get("/get-prescriptions/");
        setPrescriptions(response.data);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching prescriptions");
      }
    };

    fetchPrescriptions();
  }, []);

  // const navigate = useNavigate();

  const handleCardClick = (prescriptionId) => {
    // Handle navigation to prescription details page if needed
    // Example: navigate(`/prescription-detail/${prescriptionId}`);
  };

  return (
    <div className="container pt-3">
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="prescriptions-list">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="prescription-card"
            onClick={() => handleCardClick(prescription.id)}
          >
            <Card className="shadow p-3 border-0">
              <Card.Body>
                <Card.Title>{prescription.medication}</Card.Title>
                <Card.Text>
                  <span className="text-muted">Patient: </span>
                  {prescription.patient}
                </Card.Text>
                <Card.Text>
                  <span className="text-muted">Dosage: </span>
                  {prescription.dosage}
                </Card.Text>
                <Card.Text>
                  <span className="text-muted">Prescribed By: </span>
                  {prescription.prescribed_by}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacistView;
