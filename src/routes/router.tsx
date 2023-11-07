import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { AllSubjectsTable } from "../components/SubjectsTable";
import SubjectOverviewPage from "../pages/SubjectOverviewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <AllSubjectsTable/>
      },
      {
        path: "/subject/:subject",
        element: <SubjectOverviewPage/>
      }
    ]
  },
]);
