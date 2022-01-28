import React from 'react';
import _ from 'lodash';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Stack,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
  Select,
  InputAdornment,
  MenuItem,
  TextField
} from '@mui/material';
import { Formik } from 'formik';
import QuestionnaireStepScaffolding from './QuestionnaireStepScaffolding';
import { QUESTIONNAIRE_STEPS } from '../../constants';
import RetirementAccountTable from './RetirementAccountTable';
import { SECTION_BORDER_COLOR } from '../../colors';
import AddAccountForm from './AddAccountForm';
import NumberFormatDollarAmount from '../NumberFormatDollarAmount';

const EMPTY_FORM_VALUES = {
  accounts: [],
  isPlanningOnSellingHome: null,
  expectToSellDate: '',
  currentHomeValue: '',
  isPlanningToBuyNewHome: null,
  newHomePurchaseAmount: ''
};

const commonFormStyles = {
  shortFormInput: {
    width: '30ch'
  }
};

const getExpectToSellDropdownOptions = ({
  currentAge,
  lifeExpectancy,
  // eslint-disable-next-line no-unused-vars
  retirementAge
}) => {
  const yearsUntilLifeExpectancy = lifeExpectancy - currentAge;
  const currentYear = new Date().getFullYear();
  const selectionOptions = Array.from(
    { length: yearsUntilLifeExpectancy },
    (item, index) => {
      const aFutureYear = currentYear + index;
      return { label: `In ${aFutureYear}`, value: aFutureYear.toString() };
    }
  );
  selectionOptions.unshift({ label: 'At Retirement', value: 'at_retirement' });
  return selectionOptions;
};

export default function QuestionaireStepThree({
  // eslint-disable-next-line no-unused-vars
  currentStep,
  setCurrentStep,
  completedStepValues,
  setCompletedValuesForStep
}) {
  const { currentAge, lifeExpectancy, retirementAge } =
    completedStepValues.stepOne;
  const completedStepThreeValues = completedStepValues.stepThree;
  const stepInitialValues = _.isEmpty(completedStepThreeValues)
    ? EMPTY_FORM_VALUES
    : completedStepThreeValues;
  const expectToSellDropDownOptions = getExpectToSellDropdownOptions({
    currentAge,
    lifeExpectancy,
    retirementAge
  });
  return (
    <QuestionnaireStepScaffolding>
      <Formik
        initialValues={stepInitialValues}
        validationSchema={Yup.object({
          isPlanningOnSellingHome: Yup.boolean()
            .required('Required')
            .nullable(),
          expectToSellDate: Yup.string().when('isPlanningOnSellingHome', {
            is: true,
            then: Yup.string().required('Required')
          }),
          currentHomeValue: Yup.string().when('isPlanningOnSellingHome', {
            is: true,
            then: Yup.string().required('Required')
          })
        })}
        onSubmit={(formValues) => {
          setCompletedValuesForStep({ stepName: 'stepThree', formValues });
          setCurrentStep(QUESTIONNAIRE_STEPS.retirementExpectations);
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
                  <AddAccountForm
                    accounts={formValues.accounts}
                    onClickAddAccount={handleAddAccount}
                  />
                </Box>
              </Box>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <Box sx={{ m: 4 }}>
                  <Box sx={{ mt: 4, display: 'flex', flexDirection: 'row' }}>
                    <Box
                      sx={{ flex: 1, display: 'flex', alignItems: 'center' }}
                    >
                      <Box
                        sx={{
                          ml: 4,
                          mr: 4
                        }}
                      >
                        Do you plan on selling your home?
                      </Box>
                    </Box>
                    <FormControl
                      error={
                        touched.isPlanningOnSellingHome &&
                        Boolean(errors.isPlanningOnSellingHome)
                      }
                      component="fieldset"
                      sx={{ flex: 1 }}
                    >
                      <RadioGroup
                        row
                        aria-label="is-planning-on-selling-home-btn-group"
                        name="isPlanningOnSellingHome"
                        value={formValues.isPlanningOnSellingHome}
                        onChange={async (e) => {
                          if (e.target.value === 'true') {
                            await setFieldValue(
                              'isPlanningOnSellingHome',
                              true
                            );
                          }
                          if (e.target.value === 'false') {
                            await setFieldValue(
                              'isPlanningOnSellingHome',
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
                        {touched.isPlanningOnSellingHome &&
                          errors.isPlanningOnSellingHome}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  {formValues.isPlanningOnSellingHome === true && (
                    <>
                      <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
                        <Typography component="div" sx={{ flex: 1 }}>
                          <Box sx={{ ml: 4 }}>When do you expect to sell?</Box>
                        </Typography>
                        <Box sx={{ flex: 1 }}>
                          <FormControl
                            sx={commonFormStyles.shortFormInput}
                            error={
                              touched.expectToSellDate &&
                              Boolean(errors.expectToSellDate)
                            }
                          >
                            <Select
                              id="expect-to-sell-date-select"
                              startAdornment={
                                <InputAdornment position="start" />
                              }
                              endAdornment={<InputAdornment position="end" />}
                              value={formValues.expectToSellDate}
                              name="expectToSellDate"
                              onChange={handleChange}
                            >
                              {expectToSellDropDownOptions.map((i) => (
                                <MenuItem key={i.value} value={i.value}>
                                  {i.label}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.expectToSellDate &&
                                errors.expectToSellDate}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </Stack>
                      <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
                        <Typography component="div" sx={{ flex: 1 }}>
                          <Box sx={{ ml: 4 }}>
                            What is the current value of your home?
                          </Box>
                        </Typography>
                        <Box sx={{ flex: 1 }}>
                          <TextField
                            sx={commonFormStyles.shortFormInput}
                            variant="outlined"
                            value={formValues.currentHomeValue}
                            onChange={handleChange}
                            name="currentHomeValue"
                            id="current-home-value-input"
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
                              touched.currentHomeValue &&
                              Boolean(errors.currentHomeValue)
                            }
                            helperText={
                              touched.currentHomeValue &&
                              errors.currentHomeValue
                            }
                          />
                        </Box>
                      </Stack>
                      <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
                        <Box
                          sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Box
                            sx={{
                              ml: 4,
                              mr: 4
                            }}
                          >
                            Do you plan on buying a new home?
                          </Box>
                        </Box>
                        <FormControl
                          error={
                            touched.isPlanningToBuyNewHome &&
                            Boolean(errors.isPlanningToBuyNewHome)
                          }
                          component="fieldset"
                          sx={{ flex: 1 }}
                        >
                          <RadioGroup
                            row
                            aria-label="is-planning-on-buying-home-btn-group"
                            name="isPlanningToBuyNewHome"
                            value={formValues.isPlanningToBuyNewHome}
                            onChange={async (e) => {
                              if (e.target.value === 'true') {
                                await setFieldValue(
                                  'isPlanningToBuyNewHome',
                                  true
                                );
                                await setFieldValue(
                                  'newHomePurchaseAmount',
                                  ''
                                );
                              }
                              if (e.target.value === 'false') {
                                await setFieldValue(
                                  'isPlanningToBuyNewHome',
                                  false
                                );
                                await setFieldValue(
                                  'newHomePurchaseAmount',
                                  '0'
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
                            {touched.isPlanningToBuyNewHome &&
                              errors.isPlanningToBuyNewHome}
                          </FormHelperText>
                        </FormControl>
                      </Stack>
                      {formValues.isPlanningToBuyNewHome === true &&
                        formValues.isPlanningOnSellingHome === true && (
                          <Stack
                            sx={{ mt: 4 }}
                            direction="row"
                            alignItems="center"
                          >
                            <Typography component="div" sx={{ flex: 1 }}>
                              <Box sx={{ ml: 4 }}>
                                What is the expected cost of your new home?
                              </Box>
                            </Typography>
                            <Box sx={{ flex: 1 }}>
                              <TextField
                                sx={commonFormStyles.shortFormInput}
                                variant="outlined"
                                value={formValues.newHomePurchaseAmount}
                                onChange={handleChange}
                                name="newHomePurchaseAmount"
                                id="new-home-purchase-amount-input"
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
                                  touched.newHomePurchaseAmount &&
                                  Boolean(errors.newHomePurchaseAmount)
                                }
                                helperText={
                                  touched.newHomePurchaseAmount &&
                                  errors.newHomePurchaseAmount
                                }
                              />
                            </Box>
                          </Stack>
                        )}
                    </>
                  )}
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
            </Box>
          );
        }}
      </Formik>
    </QuestionnaireStepScaffolding>
  );
}
