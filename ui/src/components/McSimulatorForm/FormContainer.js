import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import McSimulatorFormSection from './McSimulatorFormSection';
import LifestyleFormContent from './FormSections/LifestyleFormContent';
import IncomeFormContent from './FormSections/IncomeFormContent';
import PortfolioFormContent from './FormSections/PortfolioFormContent';
import { submitRetirementSimulationForm } from '../../api/formSubmissions';
import {
  INVESTMENT_STYLE_ENUM,
  DEFAULT_INFLATION_MEAN,
  DEFAULT_INCOME_GROWTH_MEAN,
  REAL_ESTATE_NATIONAL_AVG_HOME_APPRECIATION_PCT
} from '../../constants';
import {
  calcPostRetirementAnnualIncomeAndTaxRate,
  calcYearsUntilRetirement
} from '../../utils/generalUtils';
import ResultsContainer from './FormResults/ResultsContainer';
import { calcCompoundedInterestAmount } from '../../utils/questionnaireUtils';

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

const IncomeFormSection = withFormSection({
  WrappedComponent: IncomeFormContent,
  sectionTitle: 'Income'
});

const PortfolioFormSection = withFormSection({
  WrappedComponent: PortfolioFormContent,
  sectionTitle: 'Portfolio'
});

const EMPTY_STATE = {
  simulationRunCompleted: false,
  isFetching: false
};

// The internal form state managed by formik
const EMPTY_FORM_VALUES = {
  adjustForInflation: true,
  adjustContributionsForIncomeGrowth: true,
  adjustWithdrawalsForTaxation: true,
  initialPortfolioAmount: '',
  preRetirementAnnualContribution: '',
  postRetirementAnnualWithdrawal: '',
  currentAge: '',
  retirementAge: '',
  lifeExpectancy: '',
  inflationMean: (DEFAULT_INFLATION_MEAN * 100).toString(),
  incomeGrowthMean: (DEFAULT_INCOME_GROWTH_MEAN * 100).toString(),
  preRetirementMeanRateOfReturn: '',
  postRetirementMeanRateOfReturn: '',
  preRetirementInvestmentStyle: '',
  postRetirementInvestmentStyle: '',
  filingStatus: '',
  additionalPostRetirementAnnualIncome: '0',
  homeSaleNetProceeds: ''
};

// const INITIAL_FORM_VALUES = {
//   adjustForInflation: true,
//   adjustContributionsForIncomeGrowth: true,
//   adjustWithdrawalsForTaxation: true,
//   initialPortfolioAmount: '100000',
//   preRetirementAnnualContribution: '20000',
//   postRetirementAnnualWithdrawal: '100000',
//   currentAge: '20',
//   retirementAge: '65',
//   lifeExpectancy: '90',
//   inflationMean: '2.40',
//   incomeGrowthMean: '2.79',
//   preRetirementMeanRateOfReturn: '9.50',
//   postRetirementMeanRateOfReturn: '4.00',
//   preRetirementInvestmentStyle: 'Aggressive',
//   postRetirementInvestmentStyle: 'Conservative',
//   filingStatus: 'singleFiler',
//   additionalPostRetirementAnnualIncome: '20000',
//    homeSaleNetProceeds: '100000'
// };

const numberToPercent = (aNumber) => aNumber / 100;

export default function FormContainer() {
  const { state: routerState } = useLocation();
  let initialFormState = EMPTY_FORM_VALUES;
  let initialComponentState = EMPTY_STATE;
  // Fork the state if we are coming from the questionairre
  // to show a populated form and simulation results
  if (routerState && routerState.questionnaire) {
    initialFormState = routerState.questionnaire.stateAsFormValues;
    initialComponentState = {
      simulationRunCompleted: true,
      isFetching: false,
      ...routerState.questionnaire.simulationResults
    };
  }
  const [simulationResults, setSimulationResults] = useState(
    initialComponentState
  );
  return (
    <Formik
      initialValues={initialFormState}
      validationSchema={Yup.object({
        currentAge: Yup.number()
          .integer()
          .moreThan(-1, 'Must be >= 0')
          .max(150, 'Cannot exceed 150')
          .required('Required'),
        retirementAge: Yup.number()
          .integer()
          .moreThan(Yup.ref('currentAge'), 'Must be greater than current age')
          .max(150, 'Cannot exceed 150')
          .required('Required'),
        lifeExpectancy: Yup.number()
          .integer()
          .moreThan(
            Yup.ref('retirementAge'),
            'Must be greater than retirement age'
          )
          .max(150, 'Cannot exceed 150')
          .required('Required'),
        initialPortfolioAmount: Yup.string().required('Required'),
        preRetirementAnnualContribution: Yup.string().required('Required'),
        postRetirementAnnualWithdrawal: Yup.string().required('Required'),
        homeSaleNetProceeds: Yup.string().required('Required'),
        preRetirementInvestmentStyle: Yup.string().required('Required'),
        postRetirementInvestmentStyle: Yup.string().required('Required'),
        inflationMean: Yup.string().when('adjustForInflation', {
          is: true,
          then: Yup.string().required('Required')
        }),
        preRetirementMeanRateOfReturn: Yup.string().required('Required'),
        postRetirementMeanRateOfReturn: Yup.string().required('Required'),
        incomeGrowthMean: Yup.string().when(
          'adjustContributionsForIncomeGrowth',
          {
            is: true,
            then: Yup.string().required('Required')
          }
        ),
        filingStatus: Yup.string().when('adjustWithdrawalsForTaxation', {
          is: true,
          then: Yup.string().required('Required')
        }),
        additionalPostRetirementAnnualIncome: Yup.string().required('Required')
      })}
      onSubmit={async (formValues) => {
        const { preRetirementRateOfReturnVolatility } = Object.values(
          INVESTMENT_STYLE_ENUM
        ).find((i) => i.label === formValues.preRetirementInvestmentStyle);

        const { postRetirementRateOfReturnVolatility } = Object.values(
          INVESTMENT_STYLE_ENUM
        ).find((i) => i.label === formValues.postRetirementInvestmentStyle);

        const { postRetirementTaxRateAsDecimal } =
          calcPostRetirementAnnualIncomeAndTaxRate({
            filingStatus: formValues.filingStatus,
            postRetirementAnnualWithdrawal:
              formValues.postRetirementAnnualWithdrawal,
            additionalPostRetirementAnnualIncome:
              formValues.additionalPostRetirementAnnualIncome
          });
        const yearsInFutureOfHomePurchase = calcYearsUntilRetirement({
          currentAge: formValues.currentAge,
          retirementAge: formValues.retirementAge
        });
        const homeSaleNetProceedsNonAdjusted = parseInt(
          formValues.homeSaleNetProceeds,
          10
        );
        const adjustedFutureHomeSellPrice = calcCompoundedInterestAmount({
          principal: homeSaleNetProceedsNonAdjusted,
          annualInterestRate: REAL_ESTATE_NATIONAL_AVG_HOME_APPRECIATION_PCT,
          time: yearsInFutureOfHomePurchase,
          numTimesCompoundedPerPeriod: 1
        });
        setSimulationResults({ isFetching: true });
        const results = await submitRetirementSimulationForm({
          formParams: {
            ...formValues,
            adjustPortfolioBalanceForInflation: formValues.adjustForInflation,
            adjustWithdrawalsForInflation: formValues.adjustForInflation,
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
            ),
            postRetirementTaxRate: postRetirementTaxRateAsDecimal,
            homeSaleNetProceeds: parseInt(adjustedFutureHomeSellPrice, 10),
            yearsInFutureOfHomePurchase
          }
        });
        setSimulationResults({
          ...results,
          isFetching: false,
          simulationRunCompleted: true
        });
      }}
    >
      {({
        values: formValues,
        handleChange,
        // eslint-disable-next-line no-unused-vars
        setValues,
        handleSubmit,
        touched,
        errors,
        setFieldValue,
        resetForm
      }) => {
        const handleClickResetButton = () => {
          resetForm({
            values: EMPTY_FORM_VALUES
          }); // Reset the input form state in Formik
          setSimulationResults(EMPTY_STATE); // Reset the output of the simulation on display
        };
        const { postRetirementAnnualIncome, postRetirementTaxRate } =
          calcPostRetirementAnnualIncomeAndTaxRate({
            filingStatus: formValues.filingStatus,
            postRetirementAnnualWithdrawal:
              formValues.postRetirementAnnualWithdrawal,
            additionalPostRetirementAnnualIncome:
              formValues.additionalPostRetirementAnnualIncome
          });
        return (
          <>
            <Box sx={{ mt: 4, mb: 4 }}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <Box sx={{ pb: 4, borderBottom: '1px solid gray' }}>
                  <Button
                    component={Link}
                    to="/home"
                    variant="outlined"
                    onClick={() => null}
                    startIcon={<KeyboardBackspaceIcon />}
                  >
                    Back
                  </Button>
                  <Typography sx={{ mt: 2 }} variant="h6">
                    Monte Carlo Simulator
                  </Typography>
                  <Typography variant="p">
                    Input the information below and then run the simulation to
                    see the likelihood that you will meet your retirement goals
                    under a variety of market conditions.
                  </Typography>
                </Box>
                <Box
                  sx={{ ml: 4, mr: 4, pb: 4, borderBottom: '1px solid gray' }}
                >
                  <LifestyleFormSection
                    currentAge={formValues.currentAge}
                    retirementAge={formValues.retirementAge}
                    lifeExpectancy={formValues.lifeExpectancy}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                  />
                  <PortfolioFormSection
                    initialPortfolioAmount={formValues.initialPortfolioAmount}
                    preRetirementAnnualContribution={
                      formValues.preRetirementAnnualContribution
                    }
                    postRetirementAnnualWithdrawal={
                      formValues.postRetirementAnnualWithdrawal
                    }
                    additionalPostRetirementAnnualIncome={
                      formValues.additionalPostRetirementAnnualIncome
                    }
                    adjustContributionsForIncomeGrowth={
                      formValues.adjustContributionsForIncomeGrowth
                    }
                    incomeGrowthMean={formValues.incomeGrowthMean}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
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
                    setFieldValue={setFieldValue}
                    adjustForInflation={formValues.adjustForInflation}
                  />
                  <IncomeFormSection
                    initialPortfolioAmount={formValues.initialPortfolioAmount}
                    preRetirementAnnualContribution={
                      formValues.preRetirementAnnualContribution
                    }
                    postRetirementAnnualWithdrawal={
                      formValues.postRetirementAnnualWithdrawal
                    }
                    additionalPostRetirementAnnualIncome={
                      formValues.additionalPostRetirementAnnualIncome
                    }
                    adjustContributionsForIncomeGrowth={
                      formValues.adjustContributionsForIncomeGrowth
                    }
                    incomeGrowthMean={formValues.incomeGrowthMean}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
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
                    homeSaleNetProceeds={formValues.homeSaleNetProceeds}
                    inflationMean={formValues.inflationMean}
                    setFieldValue={setFieldValue}
                    adjustForInflation={formValues.adjustForInflation}
                    filingStatus={formValues.filingStatus}
                    adjustWithdrawalsForTaxation={
                      formValues.adjustWithdrawalsForTaxation
                    }
                    postRetirementAnnualIncome={postRetirementAnnualIncome}
                    postRetirementTaxRate={postRetirementTaxRate}
                  />
                </Box>
                <Box sx={{ mt: 4, ml: 4, mr: 4 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" type="submit">
                        {simulationResults.simulationRunCompleted
                          ? 'Re-run Simulation'
                          : 'Run Simulation'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleClickResetButton}
                      >
                        Reset
                      </Button>
                    </Stack>
                    {simulationResults.isFetching && <CircularProgress />}
                  </Stack>
                </Box>
              </Box>
            </Box>
            <ResultsContainer
              simulationResults={simulationResults}
              adjustForInflation={formValues.adjustForInflation}
            />
          </>
        );
      }}
    </Formik>
  );
}
