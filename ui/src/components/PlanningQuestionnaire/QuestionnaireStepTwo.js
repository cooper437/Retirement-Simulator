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

const EMPTY_FORM_VALUES = {
  annualHouseHoldIncome: '',
  discretionaryIncome: '',
  contributionStyle: '',
  annualizedPercentIncomeContribution: '3.5',
  isFixedContributionTypicalGrowthExpected: undefined,
  annualizedFixedIncomeContribution: ''
};

const CONTRIBUTION_STYLES = {
  percentage: {
    label: 'Percentage',
    value: 'percentage'
  },
  fixedAmount: {
    label: 'Fixed Amount',
    value: 'fixed_amount'
  }
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
        validationSchema={Yup.object({
          annualHouseHoldIncome: Yup.string().required('Required'),
          discretionaryIncome: Yup.string().required('Required'),
          contributionStyle: Yup.string().required('Required'),
          annualizedPercentIncomeContribution: Yup.string().when(
            'contributionStyle',
            {
              is: CONTRIBUTION_STYLES.percentage.value,
              then: Yup.string().required('Required')
            }
          ),
          annualizedFixedIncomeContribution: Yup.string().when(
            'contributionStyle',
            {
              is: CONTRIBUTION_STYLES.fixedAmount.value,
              then: Yup.string().required('Required')
            }
          ),
          isFixedContributionTypicalGrowthExpected:
            Yup.boolean().required('Required')
        })}
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
          resetForm,
          setFieldValue
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
                Tell us about your current income
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
                <TextField
                  label="Discretionary Income"
                  sx={commonFormStyles.shortFormInput}
                  variant="outlined"
                  value={formValues.discretionaryIncome}
                  onChange={handleChange}
                  name="discretionaryIncome"
                  id="discretionary-income"
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
                    touched.discretionaryIncome &&
                    Boolean(errors.discretionaryIncome)
                  }
                  helperText={
                    touched.discretionaryIncome && errors.discretionaryIncome
                  }
                />
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
                      const selection = Object.values(CONTRIBUTION_STYLES).find(
                        (i) => i.label === e.target.value
                      );
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
                <Box style={{ marginLeft: '32px' }}>
                  {formValues.contributionStyle &&
                    formValues.contributionStyle ===
                      CONTRIBUTION_STYLES.percentage.value && (
                      <TextField
                        sx={{
                          width: commonFormStyles.shortFormInput.width
                        }}
                        label="Income Contribution To Retirement"
                        variant="outlined"
                        value={formValues.annualizedPercentIncomeContribution}
                        name="annualizedPercentIncomeContribution"
                        onChange={handleChange}
                        id="annualized-percent-income-contribution"
                        InputLabelProps={{
                          shrink: true
                        }}
                        InputProps={{
                          inputComponent: NumberFormatPercentage,
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          )
                        }}
                        error={
                          touched.annualizedPercentIncomeContribution &&
                          Boolean(errors.annualizedPercentIncomeContribution)
                        }
                        helperText={
                          touched.annualizedPercentIncomeContribution &&
                          errors.annualizedPercentIncomeContribution
                        }
                      />
                    )}
                  {formValues.contributionStyle &&
                    formValues.contributionStyle ===
                      CONTRIBUTION_STYLES.fixedAmount.value && (
                      <TextField
                        label="Income Contribution To Retirement"
                        sx={{
                          width: commonFormStyles.shortFormInput.width
                        }}
                        variant="outlined"
                        value={formValues.annualizedFixedIncomeContribution}
                        onChange={handleChange}
                        name="annualizedFixedIncomeContribution"
                        id="annualized-fixed-income-contribution"
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
                          touched.annualizedFixedIncomeContribution &&
                          Boolean(errors.annualizedFixedIncomeContribution)
                        }
                        helperText={
                          touched.annualizedFixedIncomeContribution &&
                          errors.annualizedFixedIncomeContribution
                        }
                      />
                    )}
                  {formValues.contributionStyle &&
                    formValues.contributionStyle ===
                      CONTRIBUTION_STYLES.fixedAmount.value && (
                      <FormControl
                        sx={{ mt: 4 }}
                        error={
                          touched.isFixedContributionTypicalGrowthExpected &&
                          Boolean(
                            errors.isFixedContributionTypicalGrowthExpected
                          )
                        }
                        component="fieldset"
                      >
                        <FormLabel component="legend">
                          Do you expect your annual contributions to adjust in
                          accordance with typical income growth?
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-label="gender"
                          name="isFixedContributionTypicalGrowthExpected"
                          value={
                            formValues.isFixedContributionTypicalGrowthExpected
                          }
                          onChange={(e) => {
                            if (e.target.value === 'true')
                              setFieldValue(
                                'isFixedContributionTypicalGrowthExpected',
                                true
                              );
                            if (e.target.value === 'false')
                              setFieldValue(
                                'isFixedContributionTypicalGrowthExpected',
                                false
                              );
                            // eslint-disable-next-line no-console
                            console.log(e);
                          }}
                        >
                          <FormControlLabel
                            value={Boolean(true)}
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value={Boolean(false)}
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                        <FormHelperText>
                          {touched.isFixedContributionTypicalGrowthExpected &&
                            errors.isFixedContributionTypicalGrowthExpected}
                        </FormHelperText>
                      </FormControl>
                    )}
                </Box>
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
