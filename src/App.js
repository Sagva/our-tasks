import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import LoginPage from "./pages/Authentication/LoginPage";
import SignupPage from "./pages/Authentication/SignupPage";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";
import LogoutPage from "./pages/Authentication/LogoutPage";
import Navbar from "./components/Navbar";
import AllProjectsPage from "./pages/AllProjectsPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container id="App" className="py-3">
        <Routes>
          {/* Guest routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path={`/forgot-password`} element={<ForgotPasswordPage />} />
          <Route path={`/logout`} element={<LogoutPage />} />
          {/* Protected routes */}
          <Route
            path={`/projects`}
            element={
              <RequireAuth redirectTo={`/login`}>
                <AllProjectsPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
