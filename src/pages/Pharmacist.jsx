import React, { useEffect, useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { axiosWithHeader } from "../api/axios";

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

  return (
    <div className="container pt-3">
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="row">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="col-lg-4 mb-3">
            <Card className="shadow p-3 border-0">
              <Card.Body>
                <Card.Title>{prescription.medication}</Card.Title>
                <Card.Text>Dosage: {prescription.dosage}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacistView;
