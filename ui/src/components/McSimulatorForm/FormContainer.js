import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import McSimulatorFormSection from './McSimulatorFormSection';
import LifestyleFormContent from './FormSections/LifestyleFormContent';
import MarketConditionsFormContent from './FormSections/MarketConditionsFormContent';
import PortfolioFormContent from './FormSections/PortfolioFormContent';
import TaxesFormContent from './FormSections/TaxesFormContent';

const commonFormStyles = {
  shortFormInput: {
    mt: 2,
    width: '30ch'
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
  const [formValues, setFormValues] = useState({
    adjustPortfolioBalanceForInflation: true,
    adjustContributionsForIncomeGrowth: true,
    adjustWithdrawalsForInflation: true,
    adjustWithdrawalsForTaxation: true,
    initialPortfolioAmount: '',
    preRetirementAnnualContribution: '',
    postRetirementAnnualWithdrawal: '',
    currentAge: '',
    retirementAge: '',
    lifeExpectancy: '',
    inflationMean: '',
    incomeGrowthMean: '',
    preRetirementMeanRateOfReturn: '',
    postRetirementMeanRateOfReturn: '',
    preRetirementRateOfReturnVolatility: '',
    postRetirementRateOfReturnVolatility: '',
    postRetirementTaxRate: '',
    additionalPostRetirementAnnualIncome: ''
  });

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
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ pb: 4, borderBottom: '1px solid gray' }}
      >
        <LifestyleFormSection />
        <PortfolioFormSection />
        <MarketConditionsFormSection />
        <TaxesFormSection />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained">Run Simulation</Button>
          <Button variant="outlined">Reset</Button>
        </Stack>
      </Box>
    </Box>
  );
}
