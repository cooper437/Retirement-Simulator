import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import QuestionnaireStepScaffolding from './QuestionnaireStepScaffolding';
import { QUESTIONNAIRE_STEPS } from '../../constants';

const EMPTY_FORM_VALUES = {
  currentAge: '',
  retirementAge: '',
  lifeExpectancy: ''
};

const commonFormStyles = {
  shortFormInput: {
    mt: 2,
    width: '30ch'
  }
};

// eslint-disable-next-line no-unused-vars
export default function QuestionnaireStepOne({
  currentStep,
  setCurrentStep,
  completedStepValues,
  setCompletedValuesForStep
}) {
  const completedStepOneValues = completedStepValues.stepOne;
  const stepInitialValues = _.isEmpty(completedStepOneValues)
    ? EMPTY_FORM_VALUES
    : completedStepOneValues;
  return (
    <QuestionnaireStepScaffolding>
      <Formik
        initialValues={stepInitialValues}
        validationSchema={Yup.object({
          currentAge: Yup.number()
            .integer()
            .moreThan(-1, 'Must be >= 0')
            .max(150, 'Cannot exceed 150')
            .required('Required'),
          retirementAge: Yup.number()
            .integer()
            .moreThan(Yup.ref('currentAge'), 'Must be greater than Current Age')
            .max(150, 'Cannot exceed 150')
            .required('Required'),
          lifeExpectancy: Yup.number()
            .integer()
            .moreThan(
              Yup.ref('retirementAge'),
              'Must be greater than Retirement Age'
            )
            .max(150, 'Cannot exceed 150')
            .required('Required')
        })}
        onSubmit={(formValues) => {
          setCompletedValuesForStep({ stepName: 'stepOne', formValues });
          setCurrentStep(QUESTIONNAIRE_STEPS.currentLifestyle);
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
              stepName: 'stepOne',
              formValues: {}
            });
            resetForm({
              values: EMPTY_FORM_VALUES
            });
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
                Step 1: Lifestyle Planning
              </Typography>
              <Typography variant="h5" sx={{ m: 4 }}>
                Tell Us About Yourself
              </Typography>
              <Stack sx={{ m: 4 }} spacing={4}>
                <TextField
                  sx={commonFormStyles.shortFormInput}
                  id="current-age-input"
                  label="Current Age"
                  variant="outlined"
                  type="number"
                  name="currentAge"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formValues.currentAge}
                  onChange={handleChange}
                  error={touched.currentAge && Boolean(errors.currentAge)}
                  helperText={touched.currentAge && errors.currentAge}
                />
                <TextField
                  sx={commonFormStyles.shortFormInput}
                  id="retirement-age-input"
                  label="Retirement Age"
                  variant="outlined"
                  type="number"
                  name="retirementAge"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formValues.retirementAge}
                  onChange={handleChange}
                  error={touched.retirementAge && Boolean(errors.retirementAge)}
                  helperText={touched.retirementAge && errors.retirementAge}
                />
                <TextField
                  sx={commonFormStyles.shortFormInput}
                  id="life-expectancy-input"
                  label="Life Expectancy"
                  variant="outlined"
                  type="number"
                  name="lifeExpectancy"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formValues.lifeExpectancy}
                  onChange={handleChange}
                  error={
                    touched.lifeExpectancy && Boolean(errors.lifeExpectancy)
                  }
                  helperText={touched.lifeExpectancy && errors.lifeExpectancy}
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
                      Reset Step
                    </Button>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <Button
                      component={Link}
                      to="/home"
                      sx={{ width: '10em', textAlign: 'center' }}
                      variant="outlined"
                      size="medium"
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
