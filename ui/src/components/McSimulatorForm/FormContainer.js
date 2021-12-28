import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import McSimulatorFormSection from './McSimulatorFormSection';
import LifestyleFormContent from './FormSections/LifestyleFormContent';
import MarketConditionsFormContent from './FormSections/MarketConditionsFormContent';
import PortfolioFormContent from './FormSections/PortfolioFormContent';
import TaxesFormContent from './FormSections/TaxesFormContent';
import AdjustmentsFormContent from './FormSections/AdjustmentsFormContent';

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

const AdjustmentsFormSection = withFormSection({
  WrappedComponent: AdjustmentsFormContent,
  sectionTitle: 'Adjustments'
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
    preRetirementInvestmentStyle: '',
    postRetirementInvestmentStyle: '',
    postRetirementTaxRate: '',
    additionalPostRetirementAnnualIncome: ''
  });

  const handleChangeFormValue = (fieldName) => (updatedValue) => {
    setFormValues({
      ...formValues,
      [fieldName]: updatedValue
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ pb: 4, borderBottom: '1px solid gray' }}>
        <Typography variant="h6">Monte Carlo Simulator</Typography>
        <Typography variant="p">
          Input the information below and then run the simulation to see the
          likelihood that you will meet your retirement goals under a variety of
          market conditions.
        </Typography>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ ml: 4, mr: 4, pb: 4, borderBottom: '1px solid gray' }}
      >
        <LifestyleFormSection
          currentAge={formValues.currentAge}
          retirementAge={formValues.retirementAge}
          lifeExpectancy={formValues.lifeExpectancy}
          setCurrentAge={handleChangeFormValue('currentAge')}
          setRetirementAge={handleChangeFormValue('retirementAge')}
          setLifeExpectancy={handleChangeFormValue('lifeExpectancy')}
        />
        <AdjustmentsFormSection
          adjustPortfolioBalanceForInflation={
            formValues.adjustPortfolioBalanceForInflation
          }
          adjustContributionsForIncomeGrowth={
            formValues.adjustContributionsForIncomeGrowth
          }
          adjustWithdrawalsForInflation={
            formValues.adjustWithdrawalsForInflation
          }
          adjustWithdrawalsForTaxation={formValues.adjustWithdrawalsForTaxation}
          setAdjustPortfolioBalanceForInflation={handleChangeFormValue(
            'adjustPortfolioBalanceForInflation'
          )}
          setAdjustContributionsForIncomeGrowth={handleChangeFormValue(
            'adjustContributionsForIncomeGrowth'
          )}
          setAdjustWithdrawalsForInflation={handleChangeFormValue(
            'adjustWithdrawalsForInflation'
          )}
          setAdjustWithdrawalsForTaxation={handleChangeFormValue(
            'adjustWithdrawalsForTaxation'
          )}
        />
        <PortfolioFormSection
          initialPortfolioAmount={formValues.initialPortfolioAmount}
          preRetirementAnnualContribution={
            formValues.preRetirementAnnualContribution
          }
          postRetirementAnnualWithdrawal={
            formValues.postRetirementAnnualWithdrawal
          }
          setInitialPortfolioAmount={handleChangeFormValue(
            'initialPortfolioAmount'
          )}
          setPreRetirementAnnualContribution={handleChangeFormValue(
            'preRetirementAnnualContribution'
          )}
          setPostRetirementAnnualWithdrawal={handleChangeFormValue(
            'postRetirementAnnualWithdrawal'
          )}
        />
        <MarketConditionsFormSection
          preRetirementMeanRateOfReturn={
            formValues.preRetirementMeanRateOfReturn
          }
          postRetirementMeanRateOfReturn={
            formValues.postRetirementMeanRateOfReturn
          }
          preRetirementInvestmentStyle={formValues.preRetirementInvestmentStyle}
          postRetirementInvestmentStyle={
            formValues.postRetirementInvestmentStyle
          }
          inflationMean={formValues.inflationMean}
          incomeGrowthMean={formValues.incomeGrowthMean}
          setPreRetirementMeanRateOfReturn={handleChangeFormValue(
            'preRetirementMeanRateOfReturn'
          )}
          setPostRetirementMeanRateOfReturn={handleChangeFormValue(
            'postRetirementMeanRateOfReturn'
          )}
          setPreRetirementInvestmentStyle={handleChangeFormValue(
            'preRetirementInvestmentStyle'
          )}
          setPostRetirementInvestmentStyle={handleChangeFormValue(
            'postRetirementInvestmentStyle'
          )}
          setInflationMean={handleChangeFormValue('inflationMean')}
          setIncomeGrowthMean={handleChangeFormValue('incomeGrowthMean')}
        />
        <TaxesFormSection />
      </Box>
      <Box sx={{ mt: 4, ml: 4, mr: 4 }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained">Run Simulation</Button>
          <Button variant="outlined">Reset</Button>
        </Stack>
      </Box>
    </Box>
  );
}
