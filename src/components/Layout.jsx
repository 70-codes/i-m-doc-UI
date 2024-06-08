import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

const role = localStorage.getItem("role");
export default function Outline() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar role={role} />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
