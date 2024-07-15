import React from "react";
import ShowAppointmentInfo from "../../components/ShowAppointmentInfo";
import ShowAppointmentsDetails from "../../components/ShowAppointmentsDetails";
import PaymentsReport from "../../components/paymentReport/PaymentsReport";

const Reports = () => {
  return (
    <div className="container">
      <ShowAppointmentInfo />
      <ShowAppointmentsDetails />
      <div className="mt-5">
        <PaymentsReport />
      </div>
    </div>
  );
};

export default Reports;
