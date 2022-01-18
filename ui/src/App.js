import React from 'react';
import { Container } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/TopNavBar';
import FormContainer from './components/McSimulatorForm/FormContainer';
import PlanningStyleChooser from './components/PlanningQuestionnaire/PlanningStyleChooser';

export default function App() {
  return (
    <div className="App">
      <AppBar />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<PlanningStyleChooser />} />
          <Route path="/mc-input-form" element={<FormContainer />} />
        </Routes>
      </Container>
    </div>
  );
}
