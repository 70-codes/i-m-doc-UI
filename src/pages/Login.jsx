import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { normalAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const reloadApp = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await normalAxios.post("/user/login/", userData);
      const { access, refresh, role } = response.data;

      // Store tokens and role in localStorage or state management solution
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("role", JSON.stringify(role));

      console.log("Login successful:", response.data);
      // You can redirect the user to another page or update the UI as needed
      if (role === "receptionist") {
        navigate("/receptionist");
      } else if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "admin") {
        navigate("/admin");
      } else if (role === "pharmacist") {
        navigate("/pharmacist");
      }
      reloadApp();
      if (error) {
        setError(null);
      }
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
      console.error(
        "Error logging in:",
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
          <h2 className="text-center mb-4 text-dark">Login</h2>
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
