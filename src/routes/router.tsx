import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { SubjectsTable } from "../components/SubjectsTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [{
      path: "/",
      element: <SubjectsTable/>
    }]
  },
]);
