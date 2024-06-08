import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center vh-100 ">
        <div className="col-md-4 bg-light p-5 rounded shadow-lg text-center">
          <h2 className="text-center mb-4 text-dark">404 - Page Not Found</h2>
          <p className="text-dark mb-4">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Button variant="outline-info w-100" onClick={handleGoHome}>
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
