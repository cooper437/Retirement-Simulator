import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import McSimulatorFormSection from './McSimulatorFormSection';
import LifestyleFormContent from './FormSections/LifestyleFormContent';
import MarketConditionsFormContent from './FormSections/MarketConditionsFormContent';
import PortfolioFormContent from './FormSections/PortfolioFormContent';
import TaxesFormContent from './FormSections/TaxesFormContent';
import AdjustmentsFormContent from './FormSections/AdjustmentsFormContent';
import { submitRetirementSimulationForm } from '../../api/formSubmissions';
import { INVESTMENT_STYLE_ENUM } from '../../constants';

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

const INITIAL_FORM_VALUES = {
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
  inflationMean: '2.40',
  incomeGrowthMean: '5.00',
  preRetirementMeanRateOfReturn: '',
  postRetirementMeanRateOfReturn: '',
  preRetirementInvestmentStyle: '',
  postRetirementInvestmentStyle: '',
  filingStatus: '',
  postRetirementTaxRate: '',
  additionalPostRetirementAnnualIncome: ''
};

const numberToPercent = (aNumber) => aNumber / 100;

export default function FormContainer() {
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  const handleChangeFormValue = (fieldName) => (updatedValue) =>
    setFormValues({
      ...formValues,
      [fieldName]: updatedValue
    });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { preRetirementRateOfReturnVolatility } = Object.values(
      INVESTMENT_STYLE_ENUM
    ).find((i) => i.label === formValues.preRetirementInvestmentStyle);

    const { postRetirementRateOfReturnVolatility } = Object.values(
      INVESTMENT_STYLE_ENUM
    ).find((i) => i.label === formValues.postRetirementInvestmentStyle);

    submitRetirementSimulationForm({
      formParams: {
        ...formValues,
        initialPortfolioAmount: Number.parseInt(
          formValues.initialPortfolioAmount,
          10
        ),
        additionalPostRetirementAnnualIncome: Number.parseInt(
          formValues.additionalPostRetirementAnnualIncome,
          10
        ),
        preRetirementAnnualContribution: Number.parseInt(
          formValues.preRetirementAnnualContribution,
          10
        ),
        postRetirementAnnualWithdrawal:
          -formValues.postRetirementAnnualWithdrawal,
        preRetirementMeanRateOfReturn: numberToPercent(
          formValues.preRetirementMeanRateOfReturn
        ),
        postRetirementMeanRateOfReturn: numberToPercent(
          formValues.postRetirementMeanRateOfReturn
        ),
        incomeGrowthMean: numberToPercent(formValues.incomeGrowthMean),
        inflationMean: numberToPercent(formValues.inflationMean),
        preRetirementRateOfReturnVolatility: numberToPercent(
          parseFloat(preRetirementRateOfReturnVolatility, 10)
        ),
        postRetirementRateOfReturnVolatility: numberToPercent(
          parseFloat(postRetirementRateOfReturnVolatility, 10)
        )
      }
    });
  };

  const handleResetForm = () => {
    setFormValues(INITIAL_FORM_VALUES);
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <Box sx={{ pb: 4, borderBottom: '1px solid gray' }}>
          <Typography variant="h6">Monte Carlo Simulator</Typography>
          <Typography variant="p">
            Input the information below and then run the simulation to see the
            likelihood that you will meet your retirement goals under a variety
            of market conditions.
          </Typography>
        </Box>
        <Box sx={{ ml: 4, mr: 4, pb: 4, borderBottom: '1px solid gray' }}>
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
            adjustWithdrawalsForTaxation={
              formValues.adjustWithdrawalsForTaxation
            }
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
            preRetirementInvestmentStyle={
              formValues.preRetirementInvestmentStyle
            }
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
            setPreRetirementInvestmentStyle={(
              preRetirementInvestmentStyle,
              preRetirementMeanRateOfReturn
            ) => {
              setFormValues({
                ...formValues,
                preRetirementInvestmentStyle,
                preRetirementMeanRateOfReturn
              });
            }}
            setPostRetirementInvestmentStyle={(
              postRetirementInvestmentStyle,
              postRetirementMeanRateOfReturn
            ) => {
              setFormValues({
                ...formValues,
                postRetirementInvestmentStyle,
                postRetirementMeanRateOfReturn
              });
            }}
            setInflationMean={handleChangeFormValue('inflationMean')}
            setIncomeGrowthMean={handleChangeFormValue('incomeGrowthMean')}
            adjustPortfolioBalanceForInflation={
              formValues.adjustPortfolioBalanceForInflation
            }
            adjustWithdrawalsForInflation={
              formValues.adjustWithdrawalsForInflation
            }
            adjustContributionsForIncomeGrowth={
              formValues.adjustContributionsForIncomeGrowth
            }
          />
          <TaxesFormSection
            filingStatus={formValues.filingStatus}
            additionalPostRetirementAnnualIncome={
              formValues.additionalPostRetirementAnnualIncome
            }
            setFilingStatus={handleChangeFormValue('filingStatus')}
            setAdditionalPostRetirementAnnualIncome={handleChangeFormValue(
              'additionalPostRetirementAnnualIncome'
            )}
            adjustWithdrawalsForTaxation={
              formValues.adjustWithdrawalsForTaxation
            }
          />
        </Box>
        <Box sx={{ mt: 4, ml: 4, mr: 4 }}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" type="submit">
              Run Simulation
            </Button>
            <Button variant="outlined" onClick={handleResetForm}>
              Reset
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
