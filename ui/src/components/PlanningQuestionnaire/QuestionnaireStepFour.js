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

const CONTRIBUTION_STYLES = {
  percentage: {
    label: 'Percentage of Income',
    value: 'percentage'
  },
  fixedAmount: {
    label: 'Fixed Amount',
    value: 'fixed_amount'
  }
};

const EMPTY_FORM_VALUES = {
  desiredBaseIncomeType: '',
  desiredBaseIncomePerecentage: '',
  desiredBasedIncomeFixedAmount: '',
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
  const completedStepFourValues = completedStepValues.stepOne;
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
                What is your desired base income?
              </Typography>
              <Stack sx={{ m: 4 }} spacing={6}>
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 6, mr: 2 }}>
                      How would like to contribute to your retirement every
                      year?
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FormControl
                      sx={commonFormStyles.shortFormInput}
                      error={
                        touched.contributionStyle &&
                        Boolean(errors.contributionStyle)
                      }
                    >
                      <InputLabel id="contribution-style-label">
                        Contribution Style
                      </InputLabel>
                      <Select
                        labelId="contribution-style-label"
                        id="contribution-style"
                        label="Contribution Style"
                        startAdornment={<InputAdornment position="start" />}
                        endAdornment={<InputAdornment position="end" />}
                        value={formValues.contributionStyle}
                        name="contributionStyle"
                        onChange={async (e) => {
                          const selection = Object.values(
                            CONTRIBUTION_STYLES
                          ).find((i) => i.value === e.target.value);
                          await handleChange(e);
                          setFieldValue('contributionStyle', selection.value);
                        }}
                      >
                        {Object.values(CONTRIBUTION_STYLES).map((i) => (
                          <MenuItem key={i.value} value={i.value}>
                            {i.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {touched.contributionStyle && errors.contributionStyle}
                      </FormHelperText>
                    </FormControl>
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
