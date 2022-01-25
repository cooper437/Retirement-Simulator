import React from 'react';
import _ from 'lodash';
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  InputAdornment,
  MenuItem,
  InputLabel,
  Select
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import QuestionnaireStepScaffolding from './QuestionnaireStepScaffolding';
import { QUESTIONNAIRE_STEPS } from '../../constants';
import NumberFormatDollarAmount from '../NumberFormatDollarAmount';

const BASE_INCOME_TYPES_ENUM = {
  percentage: {
    label: 'As % of Current Income',
    value: 'percentage'
  },
  fixedAmount: {
    label: 'As Fixed Amount',
    value: 'fixed_amount'
  }
};

const PERCENTAGE_INCOME_ENUM = {
  0.0: {
    label: '0%',
    value: 0.0
  },
  0.1: {
    label: '10%',
    value: 0.1
  },
  0.2: {
    label: '20%',
    value: 0.2
  },
  0.3: {
    label: '30%',
    value: 0.3
  },
  0.4: {
    label: '40%',
    value: 0.4
  },
  0.5: {
    label: '50%',
    value: 0.5
  },
  0.6: {
    label: '60%',
    value: 0.6
  },
  0.7: {
    label: '70%',
    value: 0.7
  },
  0.8: {
    label: '80%',
    value: 0.8
  },
  0.9: {
    label: '90%',
    value: 0.9
  },
  1.0: {
    label: '100%',
    value: 1.0
  }
};

const EMPTY_FORM_VALUES = {
  desiredBaseIncomeType: '',
  desiredBaseIncomePerecentage: '',
  desiredBaseIncomeFixedAmount: '',
  otherDiscretionaryIncome: '',
  socialSecurityIncome: '',
  isPlanningOnRentingRealEstate: null,
  expectedRentalIncome: '',
  expectedRentalExpenses: '',
  taxFilingStatus: ''
};

const commonFormStyles = {
  shortFormInput: {
    width: '30ch'
  }
};

export default function QuestionnaireStepFour({
  // eslint-disable-next-line no-unused-vars
  currentStep,
  setCurrentStep,
  completedStepValues,
  setCompletedValuesForStep
}) {
  const completedStepFourValues = completedStepValues.stepFour;
  const stepInitialValues = _.isEmpty(completedStepFourValues)
    ? EMPTY_FORM_VALUES
    : completedStepFourValues;
  return (
    <QuestionnaireStepScaffolding>
      <Formik
        initialValues={stepInitialValues}
        onSubmit={(formValues) => {
          setCompletedValuesForStep({ stepName: 'stepFour', formValues });
          // eslint-disable-next-line no-console
          console.log('Submitting...');
        }}
      >
        {({
          values: formValues,
          handleChange,
          handleSubmit,
          touched,
          errors,
          resetForm,
          setFieldValue
        }) => {
          const handleClickResetButton = () => {
            setCompletedValuesForStep({
              stepName: 'stepFour',
              formValues: {}
            });
            resetForm({
              values: EMPTY_FORM_VALUES
            });
          };
          const handleClickBack = () => {
            setCompletedValuesForStep({
              stepName: 'stepFour',
              formValues
            });
            setCurrentStep(QUESTIONNAIRE_STEPS.currentPortfolioAndIncome);
          };
          return (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                Step 4: Retirement Income and Expenses
              </Typography>
              <Typography variant="h5" sx={{ m: 4 }}>
                Tell us about your annual post-retiremnent income and expenses:
              </Typography>
              <Stack sx={{ m: 4 }} spacing={6}>
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 6, mr: 2 }}>
                      How would you like to withdraw your annual base income?
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FormControl
                      sx={commonFormStyles.shortFormInput}
                      error={
                        touched.desiredBaseIncomeType &&
                        Boolean(errors.desiredBaseIncomeType)
                      }
                    >
                      <InputLabel id="desired-base-income-type-label">
                        Base Income Type
                      </InputLabel>
                      <Select
                        labelId="desired-base-income-type-label"
                        id="desired-base-income-type"
                        label="Base Income Type"
                        value={formValues.desiredBaseIncomeType}
                        name="desiredBaseIncomeType"
                        onChange={async (e) => {
                          const selection = Object.values(
                            BASE_INCOME_TYPES_ENUM
                          ).find((i) => i.value === e.target.value);
                          await handleChange(e);
                          setFieldValue(
                            'desiredBaseIncomeType',
                            selection.value
                          );
                        }}
                      >
                        {Object.values(BASE_INCOME_TYPES_ENUM).map((i) => (
                          <MenuItem key={i.value} value={i.value}>
                            {i.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {touched.desiredBaseIncomeType &&
                          errors.desiredBaseIncomeType}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 18, mr: 2 }}>
                      What percentage?
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FormControl
                      sx={commonFormStyles.shortFormInput}
                      error={
                        touched.desiredBaseIncomePerecentage &&
                        Boolean(errors.desiredBaseIncomePerecentage)
                      }
                    >
                      <InputLabel id="desired-base-income-percentage-label">
                        Withdrawal Percentage
                      </InputLabel>
                      <Select
                        labelId="desired-base-income-percentage-label"
                        id="desired-base-income-percentage"
                        label="Withdrawal Percentage"
                        value={formValues.desiredBaseIncomePerecentage}
                        name="desiredBaseIncomePerecentage"
                        onChange={async (e) => {
                          const selection = Object.values(
                            PERCENTAGE_INCOME_ENUM
                          ).find((i) => i.value === e.target.value);
                          await handleChange(e);
                          setFieldValue(
                            'desiredBaseIncomePerecentage',
                            selection.value
                          );
                        }}
                      >
                        {Object.values(PERCENTAGE_INCOME_ENUM).map((i) => (
                          <MenuItem key={i.value} value={i.value}>
                            {i.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {touched.desiredBaseIncomePerecentage &&
                          errors.desiredBaseIncomePerecentage}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 18, mr: 2 }}>What Amount?</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      label="Withdrawal Amount"
                      sx={commonFormStyles.shortFormInput}
                      variant="outlined"
                      value={formValues.desiredBaseIncomeFixedAmount}
                      onChange={handleChange}
                      name="desiredBaseIncomeFixedAmount"
                      id="desired-base-income-fixed-amount"
                      InputProps={{
                        inputComponent: NumberFormatDollarAmount,
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">.00</InputAdornment>
                        )
                      }}
                      error={
                        touched.desiredBaseIncomeFixedAmount &&
                        Boolean(errors.desiredBaseIncomeFixedAmount)
                      }
                      helperText={
                        touched.desiredBaseIncomeFixedAmount &&
                        errors.desiredBaseIncomeFixedAmount
                      }
                    />
                  </Box>
                </Stack>
              </Stack>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  mb: 4
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ ml: 4, mr: 4 }}
                >
                  <Box>
                    <Button
                      sx={{ width: '10em', textAlign: 'center' }}
                      variant="outlined"
                      size="medium"
                      onClick={handleClickResetButton}
                    >
                      Reset Step
                    </Button>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <Button
                      sx={{ width: '10em', textAlign: 'center' }}
                      variant="outlined"
                      size="medium"
                      onClick={handleClickBack}
                    >
                      Back
                    </Button>
                    <Button
                      sx={{ width: '10em', textAlign: 'center' }}
                      variant="contained"
                      size="medium"
                      type="submit"
                    >
                      Finish
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          );
        }}
      </Formik>
    </QuestionnaireStepScaffolding>
  );
}
