import { Navigate, Outlet } from "react-router-dom";
import { SIGNIN } from "../consts";

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to={SIGNIN} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute