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
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { Formik } from 'formik';
import NumberFormatDollarAmount from '../NumberFormatDollarAmount';
import QuestionnaireStepScaffolding from './QuestionnaireStepScaffolding';
import { QUESTIONNAIRE_STEPS, CONTRIBUTION_STYLES } from '../../constants';
import NumberFormatPercentage from '../NumberFormatPercentage';

const EMPTY_FORM_VALUES = {
  currentAnnualHouseHoldIncome: '',
  currentDiscretionaryIncome: '',
  contributionStyle: '',
  annualizedPercentIncomeContribution: '',
  isFixedContributionTypicalGrowthExpected: null,
  annualizedFixedIncomeContribution: ''
};

const commonFormStyles = {
  shortFormInput: {
    width: '30ch'
  }
};

export default function QuestionnaireStepTwo({
  // eslint-disable-next-line no-unused-vars
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
          currentAnnualHouseHoldIncome: Yup.string().required('Required'),
          currentDiscretionaryIncome: Yup.string().required('Required'),
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
          isFixedContributionTypicalGrowthExpected: Yup.boolean()
            .nullable()
            .when('contributionStyle', {
              is: CONTRIBUTION_STYLES.fixedAmount.value,
              then: Yup.boolean().required('Required').nullable()
            })
        })}
        onSubmit={(formValues) => {
          setCompletedValuesForStep({ stepName: 'stepTwo', formValues });
          setCurrentStep(QUESTIONNAIRE_STEPS.currentPortfolioAndIncome);
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
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 6, mr: 2 }}>
                      What is your annual household income?
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      label="Household Income"
                      sx={commonFormStyles.shortFormInput}
                      variant="outlined"
                      value={formValues.currentAnnualHouseHoldIncome}
                      onChange={handleChange}
                      name="currentAnnualHouseHoldIncome"
                      id="annual-household-income"
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
                        touched.currentAnnualHouseHoldIncome &&
                        Boolean(errors.currentAnnualHouseHoldIncome)
                      }
                      helperText={
                        touched.currentAnnualHouseHoldIncome &&
                        errors.currentAnnualHouseHoldIncome
                      }
                    />
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 6, mr: 2 }}>
                      What is your annual discretionary income?
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      label="Discretionary Income"
                      sx={commonFormStyles.shortFormInput}
                      variant="outlined"
                      value={formValues.currentDiscretionaryIncome}
                      onChange={handleChange}
                      name="currentDiscretionaryIncome"
                      id="discretionary-income"
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
                        touched.currentDiscretionaryIncome &&
                        Boolean(errors.currentDiscretionaryIncome)
                      }
                      helperText={
                        touched.currentDiscretionaryIncome &&
                        errors.currentDiscretionaryIncome
                      }
                    />
                  </Box>
                </Stack>
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
                {formValues.contributionStyle &&
                  formValues.contributionStyle ===
                    CONTRIBUTION_STYLES.percentage.value && (
                    <Stack direction="row" alignItems="center">
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ ml: 6, mr: 2 }}>
                          What percentage of your income do you intend to
                          contribute?
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <TextField
                          sx={{
                            width: commonFormStyles.shortFormInput.width
                          }}
                          label="Annual % Contribution"
                          variant="outlined"
                          value={formValues.annualizedPercentIncomeContribution}
                          name="annualizedPercentIncomeContribution"
                          onChange={handleChange}
                          id="annualized-percent-income-contribution"
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
                      </Box>
                    </Stack>
                  )}
                {formValues.contributionStyle &&
                  formValues.contributionStyle ===
                    CONTRIBUTION_STYLES.fixedAmount.value && (
                    <Stack direction="row" alignItems="center">
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ ml: 6, mr: 2 }}>
                          How much do you intend to contribute?
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <TextField
                          label="Annual Fixed Contribution"
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
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                .00
                              </InputAdornment>
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
                      </Box>
                    </Stack>
                  )}
                {formValues.contributionStyle &&
                  formValues.contributionStyle ===
                    CONTRIBUTION_STYLES.fixedAmount.value && (
                    <Stack direction="row" alignItems="center">
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ ml: 6, mr: 2 }}>
                          Do you expect your annual contributions to adjust in
                          accordance with typical income growth?
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <FormControl
                          error={
                            touched.isFixedContributionTypicalGrowthExpected &&
                            Boolean(
                              errors.isFixedContributionTypicalGrowthExpected
                            )
                          }
                          component="fieldset"
                        >
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
                      </Box>
                    </Stack>
                  )}
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
