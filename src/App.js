import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      Our Tasks
      <Container id="App" className="py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
