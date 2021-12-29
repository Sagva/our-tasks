import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginPage from "./pages/Authentication/LoginPage";
import SignupPage from "./pages/Authentication/SignupPage";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";
import LogoutPage from "./pages/Authentication/LogoutPage";
import Navbar from "./components/Navbar";
import AllProjectsPage from "./pages/AllProjects/AllProjectsPage";
import RequireAuth from "./components/RequireAuth";
import ProjectPage from "./pages/ProjectPage.jsx/ProjectPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container id="App" className="py-3">
        <Routes>
          {/* Guest routes */}
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
          <Route
            path={`/project/:id`}
            element={
              <RequireAuth redirectTo={`/login`}>
                <ProjectPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
