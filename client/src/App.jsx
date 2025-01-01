import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import { Box } from "@mui/material";
import AddBookForm from "./pages/AddBookForm";

const App = () => {
  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/my-books"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <ProtectedRoute>
                <AddBookForm />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Login />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
