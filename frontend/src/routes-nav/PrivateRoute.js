import React, { useContext } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute({ element: Element, ...rest }) {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  console.debug(
    "PrivateRoute",
    "currentUser=", currentUser,
  );

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Route
      {...rest}
      element={Element}
    />
  );
}

export default PrivateRoute;
