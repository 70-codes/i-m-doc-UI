import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { axiosWithHeader } from "../api/axios";

const LE_CHOICES = [
  { value: "admin", label: "Admin" },
  { value: "doctor", label: "Doctor" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "receptionist", label: "Receptionist" },
];

const AddUser = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    role: LE_CHOICES[0].value,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setUserData((oldData) => ({
      ...oldData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await axiosWithHeader.post(
        "/user/create-user/",
        userData
      );
      setSuccess("User added successfully!");
      if (response.status === 200) {
        setSuccess("User added successfully!");
      }
      setError(null);
      setUserData({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        role: LE_CHOICES[0].value,
      });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || "An error occurred");
      } else if (error.request) {
        setError("No response received from the server");
      } else {
        setError("An error occurred while making the request");
      }
      setSuccess(null);
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={userData.role}
            onChange={handleChange}
            required
          >
            {LE_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="outline-info w-100" type="submit">
          Add User
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
