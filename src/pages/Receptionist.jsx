import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddPatient from "../components/AddPatient";
import PatientsList from "../components/PatientList/PatientList";

const Receptionist = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);

  const handleShowAdd = () => setShowModalAdd(true);
  const handleCloseAdd = () => setShowModalAdd(false);

  return (
    <div className="container mt-5">
      <h2>Receptionist </h2>
      <div className="p-2">
        <Button variant="outline-info" onClick={handleShowAdd}>
          Add Patient
        </Button>
      </div>

      <Modal show={showModalAdd} onHide={handleCloseAdd} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>Add Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPatient />
        </Modal.Body>
      </Modal>

      <h3 className="mt-5 mb-3 text-muted text-opacity-50">
        Registered Patients
      </h3>
      <PatientsList />
    </div>
  );
};

export default Receptionist;
