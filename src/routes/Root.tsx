import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Root() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div>
      <Navbar setIsSearching={setIsSearching}/>
      <div className="container-fluid">
        {!isSearching && <Outlet/>}
      </div>
    </div>
  );
}
