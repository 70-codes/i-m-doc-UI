import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddUser from "../components/AddUser";

const Admin = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);

  const handleShowAdd = () => setShowModalAdd(true);
  const handleCloseAdd = () => setShowModalAdd(false);

  return (
    <div>
      <div className="text-center mt-3">
        <h1>Admin</h1>
      </div>
      <div className="container mt-5">
        <Button variant="outline-info" onClick={handleShowAdd}>
          Add User
        </Button>

        <Modal show={showModalAdd} onHide={handleCloseAdd} className="mt-5">
          <Modal.Header closeButton>
            <Modal.Title>Register User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddUser />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Admin;
