import React from 'react';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
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
  Select,
  Link,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import QuestionnaireStepScaffolding from './QuestionnaireStepScaffolding';
import { QUESTIONNAIRE_STEPS, INVESTMENT_STYLE_ENUM } from '../../constants';
import NumberFormatDollarAmount from '../NumberFormatDollarAmount';
import { calcPostRetirementAnnualIncomeAndTaxRate } from '../../utils/generalUtils';
// eslint-disable-next-line arrow-body-style
const constructFinalPayload = () => {
  return {
    adjustPortfolioBalanceForInflation: true,
    adjustContributionsForIncomeGrowth: true,
    adjustWithdrawalsForInflation: true
  };
};

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
  desiredBaseIncomePercentage: '',
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

const reorderNthArrayElementToLast = (anArray, elementToMove) => {
  const aCopy = [...anArray];
  aCopy.push(
    aCopy.splice(
      aCopy.findIndex((i) => i.value === elementToMove.value),
      1
    )[0]
  );
  return aCopy;
};

const calcTotalCurrentIncome = ({
  annualHouseHoldIncome,
  discretionaryIncome
}) => parseInt(annualHouseHoldIncome, 10) + parseInt(discretionaryIncome, 10);

const calculateIncomeForTaxes = ({
  formValues,
  discretionaryIncome,
  annualHouseHoldIncome
}) => {
  const totalCurrentIncome = calcTotalCurrentIncome({
    discretionaryIncome,
    annualHouseHoldIncome
  });
  let desiredBaseIncomeFixedAmount;
  if (
    formValues.desiredBaseIncomeType ===
    BASE_INCOME_TYPES_ENUM.fixedAmount.value
  ) {
    desiredBaseIncomeFixedAmount = formValues.desiredBaseIncomeFixedAmount;
  }
  if (
    formValues.desiredBaseIncomeType ===
      BASE_INCOME_TYPES_ENUM.percentage.value &&
    formValues.desiredBaseIncomePercentage
  ) {
    const desiredBaseIncomeFixedAmountAsNumber = parseInt(
      totalCurrentIncome * formValues.desiredBaseIncomePercentage,
      10
    );
    desiredBaseIncomeFixedAmount =
      desiredBaseIncomeFixedAmountAsNumber.toString();
  }
  let additionalPostRetirementAnnualIncome = '';
  if (formValues.otherDiscretionaryIncome && formValues.socialSecurityIncome) {
    if (formValues.isPlanningOnRentingRealEstate === false) {
      const additionalPostRetirementAnnualIncomeAsNumber =
        parseInt(formValues.otherDiscretionaryIncome, 10) +
        parseInt(formValues.socialSecurityIncome, 10);
      additionalPostRetirementAnnualIncome =
        additionalPostRetirementAnnualIncomeAsNumber.toString();
    }
    if (
      formValues.isPlanningOnRentingRealEstate &&
      formValues.expectedRentalIncome &&
      formValues.expectedRentalExpenses
    ) {
      const netRentalIncome =
        parseInt(formValues.expectedRentalIncome, 10) -
        parseInt(formValues.expectedRentalExpenses, 10);
      const additionalPostRetirementAnnualIncomeAsNumber =
        parseInt(formValues.otherDiscretionaryIncome, 10) +
        parseInt(formValues.socialSecurityIncome, 10) +
        netRentalIncome;
      additionalPostRetirementAnnualIncome =
        additionalPostRetirementAnnualIncomeAsNumber.toString();
    }
  }
  const { postRetirementAnnualIncome, postRetirementTaxRate } =
    calcPostRetirementAnnualIncomeAndTaxRate({
      filingStatus: formValues.taxFilingStatus,
      postRetirementAnnualWithdrawal: desiredBaseIncomeFixedAmount,
      additionalPostRetirementAnnualIncome
    });
  return { postRetirementAnnualIncome, postRetirementTaxRate };
};

export default function QuestionnaireStepFour({
  // eslint-disable-next-line no-unused-vars
  currentStep,
  setCurrentStep,
  completedStepValues,
  setCompletedValuesForStep
}) {
  const {
    stepTwo: { annualHouseHoldIncome, discretionaryIncome },
    stepFour: completedStepFourValues
  } = completedStepValues;
  const stepInitialValues = _.isEmpty(completedStepFourValues)
    ? EMPTY_FORM_VALUES
    : completedStepFourValues;
  const percentageIncomeValues = Object.values(PERCENTAGE_INCOME_ENUM);
  const sortedPercentageIncomeValues = reorderNthArrayElementToLast(
    percentageIncomeValues,
    { label: '100%', value: 1 }
  );
  return (
    <QuestionnaireStepScaffolding>
      <Formik
        initialValues={stepInitialValues}
        validationSchema={Yup.object({
          desiredBaseIncomeType: Yup.string().required('Required'),
          desiredBaseIncomePercentage: Yup.string().when(
            'desiredBaseIncomeType',
            {
              is: BASE_INCOME_TYPES_ENUM.percentage.value,
              then: Yup.string().required('Required')
            }
          ),
          desiredBaseIncomeFixedAmount: Yup.string().when(
            'desiredBaseIncomeType',
            {
              is: BASE_INCOME_TYPES_ENUM.fixedAmount.value,
              then: Yup.string().required('Required')
            }
          ),
          otherDiscretionaryIncome: Yup.string().required('Required'),
          socialSecurityIncome: Yup.string().required('Required'),
          isPlanningOnRentingRealEstate: Yup.boolean()
            .required('Required')
            .nullable(),
          expectedRentalIncome: Yup.string().when(
            'isPlanningOnRentingRealEstate',
            {
              is: true,
              then: Yup.string().required('Required')
            }
          ),
          expectedRentalExpenses: Yup.string().when(
            'isPlanningOnRentingRealEstate',
            {
              is: true,
              then: Yup.string().required('Required')
            }
          ),
          taxFilingStatus: Yup.string().required('Required')
        })}
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
          const { postRetirementAnnualIncome, postRetirementTaxRate } =
            calculateIncomeForTaxes({
              formValues,
              discretionaryIncome,
              annualHouseHoldIncome
            });
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
                Tell us about your annual post-retirement income and expenses:
              </Typography>
              <Stack sx={{ m: 4 }} spacing={6}>
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 4, mr: 2 }}>
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
                          await setFieldValue(
                            'desiredBaseIncomeType',
                            selection.value
                          );
                          if (
                            selection.value ===
                            BASE_INCOME_TYPES_ENUM.fixedAmount.value
                          ) {
                            await setFieldValue(
                              'desiredBaseIncomePercentage',
                              ''
                            );
                          }
                          if (
                            selection.value ===
                            BASE_INCOME_TYPES_ENUM.percentage.value
                          ) {
                            await setFieldValue(
                              'desiredBaseIncomeFixedAmount',
                              ''
                            );
                          }
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
                {formValues.desiredBaseIncomeType ===
                  BASE_INCOME_TYPES_ENUM.percentage.value && (
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
                          touched.desiredBaseIncomePercentage &&
                          Boolean(errors.desiredBaseIncomePercentage)
                        }
                      >
                        <InputLabel id="desired-base-income-percentage-label">
                          Withdrawal Percentage
                        </InputLabel>
                        <Select
                          labelId="desired-base-income-percentage-label"
                          id="desired-base-income-percentage"
                          label="Withdrawal Percentage"
                          value={formValues.desiredBaseIncomePercentage}
                          name="desiredBaseIncomePercentage"
                          onChange={async (e) => {
                            const selection = Object.values(
                              PERCENTAGE_INCOME_ENUM
                            ).find((i) => i.value === e.target.value);
                            await handleChange(e);
                            setFieldValue(
                              'desiredBaseIncomePercentage',
                              selection.value
                            );
                          }}
                        >
                          {sortedPercentageIncomeValues.map((i) => (
                            <MenuItem key={i.value} value={i.value}>
                              {i.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {touched.desiredBaseIncomePercentage &&
                            errors.desiredBaseIncomePercentage}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Stack>
                )}
                {formValues.desiredBaseIncomeType ===
                  BASE_INCOME_TYPES_ENUM.fixedAmount.value && (
                  <Stack direction="row" alignItems="center">
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ ml: 18, mr: 2 }}>
                        What Amount?
                      </Typography>
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
                )}
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 4, mr: 2 }}>
                      What is your discretionary income?
                    </Typography>
                    <Typography sx={{ ml: 4, mr: 2 }}>
                      (Pension, Part-Time Work, etc)
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      label="Other Discretionary Income"
                      sx={commonFormStyles.shortFormInput}
                      variant="outlined"
                      value={formValues.otherDiscretionaryIncome}
                      onChange={handleChange}
                      name="otherDiscretionaryIncome"
                      id="other-discretionary-income-input"
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
                        touched.otherDiscretionaryIncome &&
                        Boolean(errors.otherDiscretionaryIncome)
                      }
                      helperText={
                        touched.otherDiscretionaryIncome &&
                        errors.otherDiscretionaryIncome
                      }
                    />
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 4, mr: 2 }}>
                      What is your social security income?
                    </Typography>
                    <Typography sx={{ ml: 4, mr: 2 }}>
                      <Link
                        target="_blank"
                        href="https://www.ssa.gov/OACT/quickcalc/"
                        rel="noreferrer"
                      >
                        Benefits Calculator
                      </Link>
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      label="Social Security Income"
                      sx={commonFormStyles.shortFormInput}
                      variant="outlined"
                      value={formValues.socialSecurityIncome}
                      onChange={handleChange}
                      name="socialSecurityIncome"
                      id="social-security-income-input"
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
                        touched.socialSecurityIncome &&
                        Boolean(errors.socialSecurityIncome)
                      }
                      helperText={
                        touched.socialSecurityIncome &&
                        errors.socialSecurityIncome
                      }
                    />
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ ml: 4, mr: 4 }}>
                      Do you plan on renting real-estate or a vacation home?
                    </Box>
                  </Box>
                  <FormControl
                    error={
                      touched.isPlanningOnRentingRealEstate &&
                      Boolean(errors.isPlanningOnRentingRealEstate)
                    }
                    component="fieldset"
                    sx={{ flex: 1 }}
                  >
                    <RadioGroup
                      row
                      aria-label="is-planning-on-renting-real-estate-btn"
                      name="isPlanningOnRentingRealEstate"
                      value={formValues.isPlanningOnRentingRealEstate}
                      onChange={async (e) => {
                        if (e.target.value === 'true') {
                          await setFieldValue(
                            'isPlanningOnRentingRealEstate',
                            true
                          );
                        }
                        if (e.target.value === 'false') {
                          await setFieldValue(
                            'isPlanningOnRentingRealEstate',
                            false
                          );
                        }
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
                      {touched.isPlanningOnRentingRealEstate &&
                        errors.isPlanningOnRentingRealEstate}
                    </FormHelperText>
                  </FormControl>
                </Stack>
                {formValues.isPlanningOnRentingRealEstate && (
                  <>
                    <Stack direction="row" alignItems="center">
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ ml: 18, mr: 2 }}>
                          Expected rental income
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <TextField
                          label="Rental Income"
                          sx={commonFormStyles.shortFormInput}
                          variant="outlined"
                          value={formValues.expectedRentalIncome}
                          onChange={handleChange}
                          name="expectedRentalIncome"
                          id="expected-rental-income-input"
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
                            touched.expectedRentalIncome &&
                            Boolean(errors.expectedRentalIncome)
                          }
                          helperText={
                            touched.expectedRentalIncome &&
                            errors.expectedRentalIncome
                          }
                        />
                      </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ ml: 18, mr: 2 }}>
                          Expected rental expenses
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <TextField
                          label="Rental Expenses"
                          sx={commonFormStyles.shortFormInput}
                          variant="outlined"
                          value={formValues.expectedRentalExpenses}
                          onChange={handleChange}
                          name="expectedRentalExpenses"
                          id="expected-rental-income-input"
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
                            touched.expectedRentalExpenses &&
                            Boolean(errors.expectedRentalExpenses)
                          }
                          helperText={
                            touched.expectedRentalExpenses &&
                            errors.expectedRentalExpenses
                          }
                        />
                      </Box>
                    </Stack>
                  </>
                )}
                <Stack direction="row" alignItems="center">
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ml: 4, mr: 2 }}>
                      What is your tax filing status?
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: 1
                    }}
                  >
                    <FormControl
                      sx={commonFormStyles.shortFormInput}
                      error={
                        touched.taxFilingStatus &&
                        Boolean(errors.taxFilingStatus)
                      }
                    >
                      <InputLabel id="filing-status-label">
                        Tax Filing Status
                      </InputLabel>
                      <Select
                        labelId="filing-status-label"
                        id="filing-status-input"
                        label="Tax Filing Status"
                        startAdornment={<InputAdornment position="start" />}
                        endAdornment={<InputAdornment position="end" />}
                        value={formValues.taxFilingStatus}
                        name="taxFilingStatus"
                        onChange={handleChange}
                      >
                        <MenuItem value="singleFiler">Single Filer</MenuItem>
                        <MenuItem value="marriedFilingJointly">
                          Married Filing Jointly
                        </MenuItem>
                        <MenuItem value="marriedFilingSeparately">
                          Married Filing Separately
                        </MenuItem>
                      </Select>
                      <FormHelperText>
                        {touched.taxFilingStatus && errors.taxFilingStatus}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Stack>
                {postRetirementAnnualIncome && postRetirementTaxRate && (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    <Typography sx={{ ml: 12, mr: 12, textAlign: 'center' }}>
                      Based on your expected annual income post retirement of{' '}
                      <NumberFormat
                        thousandsGroupStyle="thousand"
                        value={postRetirementAnnualIncome.toString()}
                        prefix="$"
                        decimalSeparator="."
                        displayType="text"
                        type="text"
                        thousandSeparator
                        allowNegative
                      />{' '}
                      your assumed tax rate is {postRetirementTaxRate}%.
                    </Typography>
                  </Box>
                )}
              </Stack>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  mt: 4,
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
