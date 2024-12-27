import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppTop from "./components/AppTop";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import { Box } from "@mui/material";

//####################################################

const ProtectedLayout = ({ children }) => (
  <>
    <AppTop />
    <Box sx={{ flex: 1, pb: "56px" }}>{children}</Box>
    <Footer />
  </>
);

//####################################################

const App = () => {
  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Dashboard />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedLayout>
                <ProfilePage />
              </ProtectedLayout>
            }
          />

          <Route
            path="*"
            element={
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
