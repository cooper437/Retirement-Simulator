import React from 'react';
import _ from 'lodash';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import QuestionnaireStepScaffolding from './QuestionnaireStepScaffolding';
import { QUESTIONNAIRE_STEPS } from '../../constants';
import RetirementAccountTable from './RetirementAccountTable';
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
          const handleAddAccount = async ({
            portfolioBalance,
            accountType,
            investingStyle
          }) => {
            const updatedAccounts = formValues.accounts.concat([
              { portfolioBalance, accountType, investingStyle, id: uuidv4() }
            ]);
            await setFieldValue('accounts', updatedAccounts);
          };
          const handleRemoveAccount = async (id) => {
            const updatedAccounts = _.filter(
              formValues.accounts,
              (i) => i.id !== id
            );
            await setFieldValue('accounts', updatedAccounts);
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
                  <RetirementAccountTable
                    accounts={formValues.accounts}
                    onClickRemoveAccount={handleRemoveAccount}
                  />
                  <AddAccountForm onClickAddAccount={handleAddAccount} />
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
