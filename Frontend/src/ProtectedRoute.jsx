import { Navigate } from "react-router-dom";
import userStore from "./store/userStore";
import recruiterStore from "./store/recruiterStore";  //extra changes for role based authorization.

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = userStore((state) => state.user);
  const recruiter = recruiterStore((state) => state.recruiter);

  if (allowedRole === "user" && !user) {
    return <Navigate to="/users/login" replace />;
  }

  if (allowedRole === "recruiter" && !recruiter) {
    return <Navigate to="/recruiters/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
