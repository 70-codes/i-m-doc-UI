import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Receptionist from "./pages/Receptionist";
import Doctor from "./pages/doctor/Doctor";
import Pharmacist from "../src/pages/pharmacist/Pharmacist";
import Reports from "./pages/reports/Reports";
import PatientDetail from "./components/patientDetails/PatientDetail";
import AddUser from "./components/AddUser";
import AddPatient from "./components/AddPatient";
import BookAppointment from "./components/BookAppointment";
import PatientDetailsDoc from "./components/PatientDetailsDoc";
import Layout from "./components/Layout";
import Logout from "./pages/Logout";
import ChargePatient from "./components/ChargePatient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "admin/",
        element: <Admin />,
      },
      {
        path: "admin/add-user",
        element: <AddUser />,
      },
      {
        path: "receptionist",
        element: <Receptionist />,
      },
      {
        path: "receptionist/add-patient",
        element: <AddPatient />,
      },
      {
        path: "receptionist/chargepatient",
        element: <ChargePatient />,
      },
      {
        path: "patient-detail/:patientId",
        element: <PatientDetail />,
      },
      {
        path: "receptionist/book-appointment",
        element: <BookAppointment />,
      },
      {
        path: "doctor",
        element: <Doctor />,
      },
      {
        path: "patient-details-doc/:patientId",
        element: <PatientDetailsDoc />,
      },
      {
        path: "pharmacist",
        element: <Pharmacist />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "patient-detail/:patientId",
        element: <PatientDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  </React.StrictMode>
);
