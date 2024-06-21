import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
