import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Authentication/LoginPage";
import SignupPage from "./pages/Authentication/SignupPage";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";
import LogoutPage from "./pages/Authentication/LogoutPage";
import Navbar from "./components/Navbar";
import AllProjectsPage from "./pages/AllProjects/AllProjectsPage";
import RequireAuth from "./components/RequireAuth";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import TaskPage from "./pages/TaskPage/TaskPage";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { currentUser } = useAuthContext();
  return (
    <div className="App">
      <Navbar />
      <div className="py-3">
        <Routes>
          {/* Guest routes */}
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            element={currentUser ? <AllProjectsPage /> : <LoginPage />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/login`}
            element={<LoginPage />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/signup`}
            element={<SignupPage />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/forgot-password`}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/logout`}
            element={<LogoutPage />}
          />
          {/* Protected routes */}
          <Route
            path={`${process.env.PUBLIC_URL}/projects`}
            element={
              <RequireAuth redirectTo={`${process.env.PUBLIC_URL}/login`}>
                <AllProjectsPage />
              </RequireAuth>
            }
          />
          <Route
            path={`${process.env.PUBLIC_URL}/project/:id`}
            element={
              <RequireAuth redirectTo={`${process.env.PUBLIC_URL}/login`}>
                <ProjectPage />
              </RequireAuth>
            }
          />
          <Route
            path={`${process.env.PUBLIC_URL}/project/:project_id/task/:task_id`}
            element={
              <RequireAuth redirectTo={`${process.env.PUBLIC_URL}/login`}>
                <TaskPage />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
