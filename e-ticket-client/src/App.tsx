// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './hooks/UserLogIn';
import SignUp from './hooks/UserSignUp.tsx';
import EventPage from './pages/EventPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element = {<SignUp />}/>
        <Route path="/events" element = {<EventPage/>}/>

        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;