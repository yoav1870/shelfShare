import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppTop from "./AppTop";
import Footer from "./Footer";
import { Box } from "@mui/material";

const ProtectedRoute = ({ children, admin }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  const isAdmin = payload.isAdmin;
  if (admin && !isAdmin) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <AppTop />
      <Box sx={{ flex: 1, pb: "56px" }}>{children}</Box>
      <Footer isAdmin={isAdmin} />
    </>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  admin: PropTypes.bool,
};

export default ProtectedRoute;
