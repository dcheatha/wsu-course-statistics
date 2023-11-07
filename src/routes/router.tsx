import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import SubjectOverviewPage from "../pages/SubjectOverviewPage";
import AllSubjectsPage from "../pages/AllSubjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <AllSubjectsPage/>
      },
      {
        path: "/subject/:subject",
        element: <SubjectOverviewPage/>
      }
    ]
  },
]);
