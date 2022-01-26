import React from 'react';
import { Container, Box } from '@mui/material';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppBar from './components/TopNavBar';
import FormContainer from './components/McSimulatorForm/FormContainer';
import PlanningStyleChooser from './components/PlanningQuestionnaire/PlanningStyleChooser';
import QuestionnaireStateManager from './components/PlanningQuestionnaire/QuestionnaireStateManager';

export default function App() {
  const location = useLocation();
  const getBackgroundColor = (locationPath) => {
    if (locationPath && locationPath === '/mc-input-form') return 'white';
    return 'rgb(231, 235, 240)';
  };
  document.body.style = `background: ${getBackgroundColor(location.pathname)};`;
  return (
    <Box className="App">
      <AppBar />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<PlanningStyleChooser />} />
          <Route path="/mc-input-form" element={<FormContainer />} />
          <Route
            path="/retirement-questionnaire"
            element={<QuestionnaireStateManager />}
          />
        </Routes>
      </Container>
    </Box>
  );
}
