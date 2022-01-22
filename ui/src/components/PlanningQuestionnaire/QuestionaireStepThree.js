import React from 'react';
import _ from 'lodash';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { Formik } from 'formik';
import NumberFormatDollarAmount from '../NumberFormatDollarAmount';
import QuestionnaireStepScaffolding from './QuestionnaireStepScaffolding';
import { QUESTIONNAIRE_STEPS } from '../../constants';
import NumberFormatPercentage from '../NumberFormatPercentage';
import RetirementAccountTable from './RetirementAccountTable';

const EMPTY_FORM_VALUES = {
  accounts: [],
  isPlanningOnSellingHome: undefined,
  expectToSellDate: '',
  currentHomeValue: '',
  portfolioBalance: '',
  accountType: '',
  isInvestedInStocks: null,
  investingStyle: ''
};

const ACCOUNT_TYPES = {
  '401k': {
    label: '401k',
    value: '401k'
  },
  ira: {
    label: 'IRA',
    value: 'ira'
  }
};

const commonFormStyles = {
  shortFormInput: {
    width: '30ch'
  }
};

// eslint-disable-next-line no-unused-vars
export default function QuestionaireStepThree({
  currentStep,
  setCurrentStep,
  completedStepValues,
  setCompletedValuesForStep
}) {
  const completedStepThreeValues = completedStepValues.stepThree;
  const stepInitialValues = _.isEmpty(completedStepThreeValues)
    ? EMPTY_FORM_VALUES
    : completedStepThreeValues;
  return (
    <QuestionnaireStepScaffolding>
      <Formik
        initialValues={stepInitialValues}
        onSubmit={(formValues) => {
          setCompletedValuesForStep({ stepName: 'stepThree', formValues });
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
              stepName: 'stepThree',
              formValues: {}
            });
            resetForm({
              values: EMPTY_FORM_VALUES
            });
          };
          const handleClickBack = () => {
            setCompletedValuesForStep({
              stepName: 'stepThree',
              formValues
            });
            setCurrentStep(QUESTIONNAIRE_STEPS.currentLifestyle);
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
                Step 3: Current Portfolio & Income
              </Typography>
              <Box sx={{ m: 4, ml: 8, mr: 8 }}>
                <Typography variant="h5">
                  Tell us about your current retirement savings
                </Typography>
                <RetirementAccountTable />
                <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
                  <Typography sx={{ flex: 1 }}>
                    <Box sx={{ ml: '8em' }}>Portfolio Balance</Box>
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      sx={commonFormStyles.shortFormInput}
                      variant="outlined"
                      value={formValues.portfolioBalance}
                      onChange={handleChange}
                      name="portfolioBalance"
                      id="portfolio-balance"
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
                        touched.portfolioBalance &&
                        Boolean(errors.portfolioBalance)
                      }
                      helperText={
                        touched.portfolioBalance && errors.portfolioBalance
                      }
                    />
                  </Box>
                </Stack>
                <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
                  <Typography sx={{ flex: 1 }}>
                    <Box sx={{ ml: '8em' }}>Account Type</Box>
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <FormControl
                      sx={commonFormStyles.shortFormInput}
                      error={touched.accountType && Boolean(errors.accountType)}
                    >
                      <Select
                        id="account-type"
                        startAdornment={<InputAdornment position="start" />}
                        endAdornment={<InputAdornment position="end" />}
                        value={formValues.accountType}
                        name="accountType"
                        onChange={async (e) => {
                          const selection = Object.values(ACCOUNT_TYPES).find(
                            (i) => i.value === e.target.value
                          );
                          await handleChange(e);
                          setFieldValue('accountType', selection.value);
                        }}
                      >
                        {Object.values(ACCOUNT_TYPES).map((i) => (
                          <MenuItem key={i.value} value={i.value}>
                            {i.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {touched.accountType && errors.accountType}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Stack>
              </Box>
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
