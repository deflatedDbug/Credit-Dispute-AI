import './App.css';
import './index.css';
import CreditDisputeGenerator from './components/credit-dispute-form';
import { Auth } from "./components/Auth";
import {Nav} from './components/Nav'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useState} from "react";

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // const navigate = useNavigate();

  const handleLoginSuccess = (authState) => {
    setIsAuthenticated(authState);
    if (authState) {
      localStorage.setItem("isAuthenticated", true);
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  };
  return (
    <>
        <Nav 
          isAuthenticated={isAuthenticated}
          onLoginSuccess={() => setIsAuthenticated(handleLoginSuccess)}
        />
        <Routes>
          {/* Authentication Route */}
          <Route
            path="/sign-in"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
              )
            }
          />
          {/* Protected Route */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <CreditDisputeGenerator />
              ) : (
                <Navigate to="/sign-in" />
              )
            }
          />
        </Routes>
    </>
  );
}

export default App;
