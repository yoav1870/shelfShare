import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppTop from "./AppTop";
import Footer from "./Footer";
import { Box } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  //TODO: Implement
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <AppTop />
      <Box sx={{ flex: 1, pb: "56px" }}>{children}</Box>
      <Footer />
    </>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
