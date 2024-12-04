import './App.css';
import './index.css';
import CreditDisputeGenerator from './components/credit-dispute-form';
import { Auth } from "./components/Auth";
import { Nav } from './components/Nav'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function BackgroundManager() {
  const location = useLocation();

  useEffect(() => {
    const isAuthPage = location.pathname === "/sign-in";
    const newClassName = isAuthPage ? "auth-bg" : "main-bg"
    if (document.body.className !== newClassName) {
      document.body.className = newClassName
    }
  }, [location])
  return null;
}

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <BackgroundManager />
        <Nav 
          isAuthenticated={isAuthenticated}
          onLoginSuccess={() => setIsAuthenticated(true)}
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
    </Router>
  );
}

export default App;
