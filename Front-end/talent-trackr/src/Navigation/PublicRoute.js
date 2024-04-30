import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const auth = localStorage.getItem("token"); // Check if the token is present
  const userType = localStorage.getItem("usertype"); // Get the user type from local storage
  const userTypeString = userType === "1" ? "seeker" : "recruiter";

  // If authenticated, redirect to the appropriate home page based on user type
  if (auth) {
    if (userTypeString === "seeker") {
      return <Navigate to="/seekerhome" replace={true} />;
    } else {
      return <Navigate to="/recruiterhome" replace={true} />;
    }
  }

  // If not authenticated, allow access to public routes
  return <Outlet />;
};

export default PublicRoute;
