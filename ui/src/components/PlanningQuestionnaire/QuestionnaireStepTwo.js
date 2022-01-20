import React from 'react';
import _ from 'lodash';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';
import { Formik } from 'formik';
import NumberFormatDollarAmount from '../NumberFormatDollarAmount';
import QuestionnaireStepScaffolding from './QuestionnaireStepScaffolding';
import { QUESTIONNAIRE_STEPS } from '../../constants';

const EMPTY_FORM_VALUES = {
  annualHouseHoldIncome: '',
  discretionaryIncome: '',
  contributionStyle: '',
  annualizedPercentIncomeContribution: ''
};

const commonFormStyles = {
  shortFormInput: {
    mt: 2,
    width: '30ch'
  }
};

// eslint-disable-next-line no-unused-vars
export default function QuestionnaireStepTwo({
  currentStep,
  setCurrentStep,
  completedStepValues,
  setCompletedValuesForStep
}) {
  const completedStepTwoValues = completedStepValues.stepTwo;
  const stepInitialValues = _.isEmpty(completedStepTwoValues)
    ? EMPTY_FORM_VALUES
    : completedStepTwoValues;
  return (
    <QuestionnaireStepScaffolding>
      <Formik
        initialValues={stepInitialValues}
        onSubmit={(formValues) => {
          setCompletedValuesForStep({ stepName: 'stepTwo', formValues });
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
          resetForm
        }) => {
          const handleClickResetButton = () => {
            setCompletedValuesForStep({
              stepName: 'stepTwo',
              formValues: {}
            });
            resetForm({
              values: EMPTY_FORM_VALUES
            });
          };
          const handleClickBack = () => {
            setCompletedValuesForStep({
              stepName: 'stepTwo',
              formValues
            });
            setCurrentStep(QUESTIONNAIRE_STEPS.lifestylePlanning);
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
                Step 2: Current Lifestyle
              </Typography>
              <Typography variant="h5" sx={{ m: 4 }}>
                Tell Us About Your Current Income
              </Typography>
              <Stack sx={{ m: 4 }} spacing={4}>
                <TextField
                  label="Annual Household Income"
                  sx={commonFormStyles.shortFormInput}
                  variant="outlined"
                  value={formValues.annualHouseHoldIncome}
                  onChange={handleChange}
                  name="annualHouseHoldIncome"
                  id="annual-household-income"
                  InputLabelProps={{
                    shrink: true
                  }}
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
                    touched.annualHouseHoldIncome &&
                    Boolean(errors.annualHouseHoldIncome)
                  }
                  helperText={
                    touched.annualHouseHoldIncome &&
                    errors.annualHouseHoldIncome
                  }
                />
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
                      Reset
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
                      Next
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
