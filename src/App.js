import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import LoginPage from "./pages/Authentication/LoginPage";
import SignupPage from "./pages/Authentication/SignupPage";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";
import LogoutPage from "./pages/Authentication/LogoutPage";

function App() {
  return (
    <div className="App">
      <Container id="App" className="py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path={`/forgot-password`} element={<ForgotPasswordPage />} />
          <Route path={`/logout`} element={<LogoutPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
