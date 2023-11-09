import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../App.css';
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Root() {
  return (
    <div>
      <Navbar/>
      <div className="container-fluid">
        <Outlet/>
      </div>
    </div>
  );
}
