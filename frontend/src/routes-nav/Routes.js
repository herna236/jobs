import React from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";

function AppRoutes({ login, signup }) {
  console.debug(
      "AppRoutes",
      `login=${typeof login}`,
      `signup=${typeof signup}`,
  );

  return (
      <div className="pt-5">
        <RouterRoutes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />

          <Route element={<PrivateRoute />}>
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/profile" element={<ProfileForm />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to homepage for unknown routes */}
        </RouterRoutes>
      </div>
  );
}

export default AppRoutes;
