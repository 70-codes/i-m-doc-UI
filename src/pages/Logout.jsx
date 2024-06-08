import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const reloadApp = () => {
    window.location.reload();
  };

  useEffect(() => {
    // Clear local storage
    localStorage.clear();
    reloadApp();
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
