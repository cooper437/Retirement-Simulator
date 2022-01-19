import React from 'react';
import { Box, Stack, Typography, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import QuestionnaireStepScaffolding from './QuestionnaireStepScaffolding';

const INITIAL_FORM_VALUES = {
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

export default function QuestionnaireStepOne() {
  return (
    <QuestionnaireStepScaffolding>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
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
          // eslint-disable-next-line no-console
          console.log('Submitting...');
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
          // eslint-disable-next-line arrow-body-style
        }) => {
          return (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
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
            </Box>
          );
        }}
      </Formik>
    </QuestionnaireStepScaffolding>
  );
}
