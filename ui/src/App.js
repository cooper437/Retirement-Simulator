import React from 'react';
import { Container } from '@mui/material';
import AppBar from './components/TopNavBar';
import FormContainer from './components/McSimulatorForm/FormContainer';

export default function App() {
  return (
    <div className="App">
      <AppBar />
      <Container>
        <FormContainer />
      </Container>
    </div>
  );
}
