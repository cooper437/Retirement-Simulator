import React, { useState } from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
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
  sectionTitle: 'Portfolio & Income'
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
  additionalPostRetirementAnnualIncome: '0'
};

const numberToPercent = (aNumber) => aNumber / 100;

export default function FormContainer() {
  // const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  // const formik = useFormik({
  //   initialValues: INITIAL_FORM_VALUES,
  //   validationSchema: Yup.object({
  //     currentAge: Yup.string()
  //       .max(3, 'Must be 3 characters or less')
  //       .required('Required'),
  //     retirementAge: Yup.string()
  //       .max(3, 'Must be 3 characters or less')
  //       .required('Required'),
  //     lifeExpectancy: Yup.string()
  //       .max(3, 'Must be 3 characters or less')
  //       .required('Required'),
  //     initialPortfolioAmount: Yup.string().required('Required'),
  //     preRetirementAnnualContribution: Yup.string().required('Required'),
  //     postRetirementAnnualWithdrawal: Yup.string().required('Required')
  //   }),
  //   onSubmit: (formValues) => {
  //     const { preRetirementRateOfReturnVolatility } = Object.values(
  //       INVESTMENT_STYLE_ENUM
  //     ).find((i) => i.label === formValues.preRetirementInvestmentStyle);

  //     const { postRetirementRateOfReturnVolatility } = Object.values(
  //       INVESTMENT_STYLE_ENUM
  //     ).find((i) => i.label === formValues.postRetirementInvestmentStyle);

  //     submitRetirementSimulationForm({
  //       formParams: {
  //         ...formValues,
  //         initialPortfolioAmount: Number.parseInt(
  //           formValues.initialPortfolioAmount,
  //           10
  //         ),
  //         additionalPostRetirementAnnualIncome: Number.parseInt(
  //           formValues.additionalPostRetirementAnnualIncome,
  //           10
  //         ),
  //         preRetirementAnnualContribution: Number.parseInt(
  //           formValues.preRetirementAnnualContribution,
  //           10
  //         ),
  //         postRetirementAnnualWithdrawal:
  //           -formValues.postRetirementAnnualWithdrawal,
  //         preRetirementMeanRateOfReturn: numberToPercent(
  //           formValues.preRetirementMeanRateOfReturn
  //         ),
  //         postRetirementMeanRateOfReturn: numberToPercent(
  //           formValues.postRetirementMeanRateOfReturn
  //         ),
  //         incomeGrowthMean: numberToPercent(formValues.incomeGrowthMean),
  //         inflationMean: numberToPercent(formValues.inflationMean),
  //         preRetirementRateOfReturnVolatility: numberToPercent(
  //           parseFloat(preRetirementRateOfReturnVolatility, 10)
  //         ),
  //         postRetirementRateOfReturnVolatility: numberToPercent(
  //           parseFloat(postRetirementRateOfReturnVolatility, 10)
  //         )
  //       }
  //     });
  //   }
  // });

  // const {
  //   values: formValues,
  //   handleChange: handleChangeFormValue,
  //   setValues: setFormValues
  // } = formik;

  // const handleChangeFormValue = (fieldName) => (updatedValue) =>
  //   setFormValues({
  //     ...formValues,
  //     [fieldName]: updatedValue
  //   });

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();

  //   const { preRetirementRateOfReturnVolatility } = Object.values(
  //     INVESTMENT_STYLE_ENUM
  //   ).find((i) => i.label === formValues.preRetirementInvestmentStyle);

  //   const { postRetirementRateOfReturnVolatility } = Object.values(
  //     INVESTMENT_STYLE_ENUM
  //   ).find((i) => i.label === formValues.postRetirementInvestmentStyle);

  //   submitRetirementSimulationForm({
  //     formParams: {
  //       ...formValues,
  //       initialPortfolioAmount: Number.parseInt(
  //         formValues.initialPortfolioAmount,
  //         10
  //       ),
  //       additionalPostRetirementAnnualIncome: Number.parseInt(
  //         formValues.additionalPostRetirementAnnualIncome,
  //         10
  //       ),
  //       preRetirementAnnualContribution: Number.parseInt(
  //         formValues.preRetirementAnnualContribution,
  //         10
  //       ),
  //       postRetirementAnnualWithdrawal:
  //         -formValues.postRetirementAnnualWithdrawal,
  //       preRetirementMeanRateOfReturn: numberToPercent(
  //         formValues.preRetirementMeanRateOfReturn
  //       ),
  //       postRetirementMeanRateOfReturn: numberToPercent(
  //         formValues.postRetirementMeanRateOfReturn
  //       ),
  //       incomeGrowthMean: numberToPercent(formValues.incomeGrowthMean),
  //       inflationMean: numberToPercent(formValues.inflationMean),
  //       preRetirementRateOfReturnVolatility: numberToPercent(
  //         parseFloat(preRetirementRateOfReturnVolatility, 10)
  //       ),
  //       postRetirementRateOfReturnVolatility: numberToPercent(
  //         parseFloat(postRetirementRateOfReturnVolatility, 10)
  //       )
  //     }
  //   });
  // };

  // eslint-disable-next-line arrow-body-style
  const handleResetForm = () => {
    // setFormValues(INITIAL_FORM_VALUES);
    return null;
  };

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={Yup.object({
        currentAge: Yup.string()
          .max(3, 'Must be 3 characters or less')
          .required('Required'),
        retirementAge: Yup.string()
          .max(3, 'Must be 3 characters or less')
          .required('Required'),
        lifeExpectancy: Yup.string()
          .max(3, 'Must be 3 characters or less')
          .required('Required'),
        initialPortfolioAmount: Yup.string().required('Required'),
        preRetirementAnnualContribution: Yup.string().required('Required'),
        postRetirementAnnualWithdrawal: Yup.string().required('Required'),
        preRetirementInvestmentStyle: Yup.string().required('Required'),
        postRetirementInvestmentStyle: Yup.string().required('Required'),
        inflationMean: Yup.string().required('Required'),
        preRetirementMeanRateOfReturn: Yup.string().required('Required'),
        postRetirementMeanRateOfReturn: Yup.string().required('Required'),
        incomeGrowthMean: Yup.string().required('Required')
      })}
      onSubmit={(formValues, actions) => {
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
      }}
    >
      {({
        values: formValues,
        handleChange,
        setValues: setFormValues,
        handleSubmit,
        touched,
        errors
      }) => (
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
              <Typography variant="h6">Monte Carlo Simulator</Typography>
              <Typography variant="p">
                Input the information below and then run the simulation to see
                the likelihood that you will meet your retirement goals under a
                variety of market conditions.
              </Typography>
            </Box>
            <Box sx={{ ml: 4, mr: 4, pb: 4, borderBottom: '1px solid gray' }}>
              <LifestyleFormSection
                currentAge={formValues.currentAge}
                retirementAge={formValues.retirementAge}
                lifeExpectancy={formValues.lifeExpectancy}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
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
                touched={touched}
                errors={errors}
                handleChange={handleChange}
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
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                // setPreRetirementMeanRateOfReturn={handleChangeFormValue(
                //   'preRetirementMeanRateOfReturn'
                // )}
                // setPostRetirementMeanRateOfReturn={handleChangeFormValue(
                //   'postRetirementMeanRateOfReturn'
                // )}
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
                // setInflationMean={handleChangeFormValue('inflationMean')}
                // setIncomeGrowthMean={handleChangeFormValue('incomeGrowthMean')}
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
              {/* {formValues.adjustWithdrawalsForTaxation && (
                <TaxesFormSection
                  filingStatus={formValues.filingStatus}
                  setFilingStatus={handleChangeFormValue('filingStatus')}
                  adjustWithdrawalsForTaxation={
                    formValues.adjustWithdrawalsForTaxation
                  }
                />
              )} */}
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
      )}
    </Formik>
  );
}
