import React from 'react';
import { Box, Typography } from '@mui/material';
import McSimulatorFormSection from './McSimulatorFormSection';
import LifestyleFormContent from './FormSections/LifestyleFormContent';
import MarketConditionsFormContent from './FormSections/MarketConditionsFormContent';
import PortfolioFormContent from './FormSections/PortfolioFormContent';
import TaxesFormContent from './FormSections/TaxesFormContent';

const commonFormStyles = {
  shortFormInput: {
    mt: 2,
    width: '20ch'
  },
  longFormInput: {
    mt: 2,
    width: '30ch'
  }
};

function withFormSection({ WrappedComponent, sectionTitle }) {
  // eslint-disable-next-line react/prefer-stateless-function
  return class extends React.Component {
    render() {
      return (
        <McSimulatorFormSection
          sectionTitle={sectionTitle}
          render={() => (
            <WrappedComponent
              commonFormStyles={commonFormStyles}
              {...this.props}
            />
          )}
        />
      );
    }
  };
}

const LifestyleFormSection = withFormSection({
  WrappedComponent: LifestyleFormContent,
  sectionTitle: 'Lifestyle'
});

const MarketConditionsFormSection = withFormSection({
  WrappedComponent: MarketConditionsFormContent,
  sectionTitle: 'Market Conditions'
});

const PortfolioFormSection = withFormSection({
  WrappedComponent: PortfolioFormContent,
  sectionTitle: 'Portfolio'
});

const TaxesFormSection = withFormSection({
  WrappedComponent: TaxesFormContent,
  sectionTitle: 'Taxes'
});

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
      <Box component="form" noValidate autoComplete="off">
        <LifestyleFormSection />
        <PortfolioFormSection />
        <MarketConditionsFormSection />
        <TaxesFormSection />
      </Box>
    </Box>
  );
}
