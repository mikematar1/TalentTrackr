import { Navigate, Outlet } from "react-router-dom";

// PrivateRoute component to ensure user is authenticated and authorized
const PrivateRoute = ({ requiredUserType }) => {
  const auth = localStorage.getItem("token"); // Check if the token is present
  const userType = localStorage.getItem("usertype"); // Get the user type from local storage
  const userTypeString = userType === "1" ? "seeker" : "recruiter";

  // If not authenticated, redirect to login
  if (!auth) {
    return <Navigate to="/login" replace={true} />;
  }

  // If authenticated, but the user type doesn't match the required type, redirect to unauthorized or home
  if (userTypeString !== requiredUserType) {
    if (userTypeString === "seeker") {
      return <Navigate to="/seekerhome" replace={true} />; // You can customize the redirection destination
    } else {
      return <Navigate to="/recruiterhome" replace={true} />; // You can customize the redirection destination
    }
  }

  // If authenticated and the user type matches, allow access
  return <Outlet />;
};

export default PrivateRoute;
