import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { axiosWithHeader } from "../../api/axios";
import "./paymentReport.css";

const PaymentsReport = () => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalAmountPaid = async () => {
      try {
        const response = await axiosWithHeader.get("/api/total-amount-paid/");
        setTotalAmount(response.data.total_amount_paid);
      } catch (error) {
        setError(
          error.response?.data?.error || "Error fetching total amount paid"
        );
      }
    };

    fetchTotalAmountPaid();
  }, []);

  return (
    <div className="container mt-5">
      <Card className="payment-card">
        <Card.Body>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : totalAmount !== null ? (
            <h3>Total Amount Paid: KES {totalAmount}</h3>
          ) : (
            <p>Loading...</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentsReport;
