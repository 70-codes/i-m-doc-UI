import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { normalAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await normalAxios.post("/user/create-admin/", userData);

      if (response.status === 201) {
        setUserData({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
        navigate("/");
      }
      if (error) {
        setError(null);
      }
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
      console.error(
        "Error to register in:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleChange = (e) => {
    setUserData((oldData) => ({ ...oldData, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center vh-100 ">
        <div className="col-md-4 bg-ligh  p-5 rounded shadow-lg">
          <h2 className="text-center mb-4 text-dark">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-dark ">
                Username
              </label>
              <input
                type="text"
                className="form-control text-md-8"
                placeholder="Enter Username"
                id="username"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label text-dark ">
                First Name
              </label>
              <input
                type="text"
                className="form-control text-md-8"
                placeholder="John"
                id="first_name"
                name="first_name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label text-dark ">
                Last Name
              </label>
              <input
                type="text"
                className="form-control text-md-8"
                placeholder="Doe"
                id="last_name"
                name="last_name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-dark ">
                Email
              </label>
              <input
                type="text"
                className="form-control text-md-8"
                placeholder="johndoe@gmail.com"
                id="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-dark">
                Password
              </label>
              <input
                type="password"
                className="form-control "
                placeholder="Enter Password"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <Button variant="outline-info w-100" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
