import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  );
}