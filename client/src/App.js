import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import "./App.css";
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';
import AddNote from './pages/AddNote';
import SingleNotePage from './pages/SingleNotePage';
import EditNote from './pages/EditNote';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status by looking for the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token to boolean (true/false)
  }, []); // Runs once on component mount

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        {/* Redirect to Home if authenticated; otherwise, go to Login page */}
        <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route path='/search' element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" replace />} />
        <Route path='/profile' element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path='/addNewNote' element={isAuthenticated ? <AddNote /> : <Navigate to="/login" replace />} />
        <Route path='/singleNotePage/:id' element={isAuthenticated ? <SingleNotePage /> : <Navigate to="/login" replace />} />
        <Route path='/editNote/:id' element={isAuthenticated ? <EditNote /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;