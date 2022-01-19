import React from 'react';
import { Container, Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/TopNavBar';
import FormContainer from './components/McSimulatorForm/FormContainer';
import PlanningStyleChooser from './components/PlanningQuestionnaire/PlanningStyleChooser';
import QuestionnaireStepOne from './components/PlanningQuestionnaire/QuestionnaireStepOne';

export default function App() {
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
            element={<QuestionnaireStepOne />}
          />
        </Routes>
      </Container>
    </Box>
  );
}
