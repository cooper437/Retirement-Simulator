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
import { INVESTMENT_STYLE_ENUM, ACCOUNT_TYPES_ENUM } from '../../constants';

const EMPTY_FORM_VALUES = {
  portfolioBalance: '',
  accountType: '',
  isInvestedInStocks: null,
  investingStyle: ''
};

const commonFormStyles = {
  shortFormInput: {
    width: '30ch'
  }
};

// eslint-disable-next-line no-unused-vars
export default function AddAccountForm({ onClickAddAccount }) {
  return (
    <Formik
      initialValues={EMPTY_FORM_VALUES}
      validationSchema={Yup.object({
        portfolioBalance: Yup.string().required('Required'),
        accountType: Yup.string().required('Required'),
        isInvestedInStocks: Yup.boolean().required('Required').nullable(),
        investingStyle: Yup.string().required('Required')
      })}
      onSubmit={(formValues, actions) => {
        // eslint-disable-next-line no-console
        console.log(actions);
        onClickAddAccount({
          portfolioBalance: formValues.portfolioBalance,
          accountType: formValues.accountType,
          investingStyle: formValues.investingStyle
        });
        actions.resetForm();
      }}
    >
      {({
        values: formValues,
        handleChange,
        handleSubmit,
        touched,
        errors,
        setFieldValue
        // eslint-disable-next-line arrow-body-style
      }) => {
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
            <Box sx={{ m: 4 }}>
              <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
                <Typography sx={{ flex: 1 }}>
                  <Box sx={{ ml: 4 }}>Portfolio Balance</Box>
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
                  <Box sx={{ ml: 4 }}>Account Type</Box>
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
                        const selection = Object.values(
                          ACCOUNT_TYPES_ENUM
                        ).find((i) => i.value === e.target.value);
                        await handleChange(e);
                        setFieldValue('accountType', selection.value);
                      }}
                    >
                      {Object.values(ACCOUNT_TYPES_ENUM).map((i) => (
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
              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flex: 1 }}>
                  <FormLabel sx={{ ml: 4, mr: 4 }} component="legend">
                    Are you invested entirely in stocks and/or stock funds?
                  </FormLabel>
                </Box>
                <FormControl
                  error={
                    touched.isInvestedInStocks &&
                    Boolean(errors.isInvestedInStocks)
                  }
                  component="fieldset"
                  sx={{ flex: 1 }}
                >
                  <RadioGroup
                    row
                    aria-label="is-invested-in-stocks-btn"
                    name="isInvestedInStocks"
                    value={formValues.isInvestedInStocks}
                    onChange={async (e) => {
                      if (e.target.value === 'true') {
                        await setFieldValue('isInvestedInStocks', true);
                        await setFieldValue(
                          'investingStyle',
                          INVESTMENT_STYLE_ENUM.aggresive.value
                        );
                      }
                      if (e.target.value === 'false') {
                        await setFieldValue('isInvestedInStocks', false);
                        await setFieldValue('investingStyle', '');
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
                    {touched.isInvestedInStocks && errors.isInvestedInStocks}
                  </FormHelperText>
                </FormControl>
              </Box>
              {formValues.isInvestedInStocks === false && (
                <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
                  <Typography sx={{ flex: 1 }}>
                    <Box sx={{ ml: 4 }}>Style Of Investing</Box>
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <FormControl
                      sx={commonFormStyles.shortFormInput}
                      error={
                        touched.investingStyle && Boolean(errors.investingStyle)
                      }
                    >
                      <Select
                        id="investing-style"
                        startAdornment={<InputAdornment position="start" />}
                        endAdornment={<InputAdornment position="end" />}
                        value={formValues.investingStyle}
                        name="investingStyle"
                        onChange={async (e) => {
                          const selection = Object.values(
                            INVESTMENT_STYLE_ENUM
                          ).find((i) => i.value === e.target.value);
                          await handleChange(e);
                          setFieldValue('investingStyle', selection.value);
                        }}
                      >
                        {Object.values(INVESTMENT_STYLE_ENUM).map((i) => (
                          <MenuItem key={i.value} value={i.value}>
                            {i.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {touched.investingStyle && errors.investingStyle}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Stack>
              )}
              <Stack direction="row" justifyContent="flex-end" marginTop={4}>
                <Button
                  sx={{ width: '16em', textAlign: 'center' }}
                  variant="outlined"
                  size="medium"
                  type="submit"
                >
                  Add Another Account
                </Button>
              </Stack>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
}
