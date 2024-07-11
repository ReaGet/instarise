import { Navigate, Outlet } from "react-router-dom";
import { SIGNIN } from "../consts";

const ProtectedRoute = ({ condition, redirect = SIGNIN }: { condition: boolean, redirect?: string }) => {
  if (!condition) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute