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
import { INVESTMENT_STYLE_ENUM } from '../../constants';
import { SECTION_BORDER_COLOR } from '../../colors';
import AddAccountForm from './AddAccountForm';

const EMPTY_FORM_VALUES = {
  accounts: [],
  isPlanningOnSellingHome: undefined,
  expectToSellDate: '',
  currentHomeValue: ''
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
          const handleClickAddAccount = async ({
            portfolioBalance,
            accountType,
            investingStyle
          }) => {
            const updatedaccounts = formValues.accounts.concat([
              { portfolioBalance, accountType, investingStyle }
            ]);
            await setFieldValue('accounts', updatedaccounts);
          };
          return (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                Step 3: Current Portfolio & Income
              </Typography>
              <Box sx={{ m: 4 }}>
                <Typography variant="h5">
                  Tell us about your current retirement savings
                </Typography>
                <Box
                  sx={{
                    mt: 4,
                    ml: 4,
                    mr: 4,
                    p: 4,
                    border: `1px solid ${SECTION_BORDER_COLOR}`,
                    borderRadius: '20px'
                  }}
                >
                  <RetirementAccountTable />
                  <AddAccountForm onClickAddAccount={handleClickAddAccount} />
                </Box>
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
