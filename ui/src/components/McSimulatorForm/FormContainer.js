import React from 'react';
import { Box, Typography } from '@mui/material';
import McSimulatorFormSection from './McSimulatorFormSection';
import LifestyleFormContent from './LifestyleFormContent';

// const withFormSection = (Component, sectionTitle) => (
//   <McSimulatorFormSection
//     sectionTitle={sectionTitle}
//     render={(props) => <Component {...props} />}
//   />
// );

function withFormSection(WrappedComponent, sectionTitle) {
  // eslint-disable-next-line react/prefer-stateless-function
  return class extends React.Component {
    render() {
      return (
        <McSimulatorFormSection
          sectionTitle={sectionTitle}
          render={() => <WrappedComponent {...this.props} />}
        />
      );
    }
  };
}

const LifestyleFormSection = withFormSection(LifestyleFormContent, 'Lifestyle');

export default function FormContainer() {
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ pb: 4, borderBottom: '1px solid gray' }}>
        <Typography variant="h6">Monte Carlo Simulator</Typography>
        <Typography variant="p">
          Input the information below and then run the simulation to see the
          likelihood that you will meet your retirement goals under a variety of
          market conditions
        </Typography>
      </Box>
      <LifestyleFormSection />
    </Box>
  );
}
