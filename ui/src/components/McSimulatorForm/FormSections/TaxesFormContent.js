import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import NumberFormat from 'react-number-format';

export default function TaxesFormContent({
  commonFormStyles,
  filingStatus,
  handleChange,
  touched,
  errors,
  postRetirementAnnualIncome,
  postRetirementTaxRate,
  adjustWithdrawalsForTaxation
}) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        justifyContent="space-between"
        height="72px"
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={adjustWithdrawalsForTaxation}
                name="adjustWithdrawalsForTaxation"
                onChange={handleChange}
              />
            }
            label="Adjust for Taxes"
          />
        </FormGroup>
        {adjustWithdrawalsForTaxation && (
          <FormControl
            sx={commonFormStyles.shortFormInput}
            error={touched.filingStatus && Boolean(errors.filingStatus)}
          >
            <InputLabel id="filing-status-label">
              Post-Retirement Filing Status
            </InputLabel>
            <Select
              labelId="filing-status-label"
              id="filing-status-input"
              label="Post-Retirement Filing Status"
              startAdornment={<InputAdornment position="start" />}
              endAdornment={<InputAdornment position="end" />}
              value={filingStatus}
              name="filingStatus"
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
              {touched.filingStatus && errors.filingStatus}
            </FormHelperText>
          </FormControl>
        )}
      </Box>
      {adjustWithdrawalsForTaxation &&
        postRetirementAnnualIncome &&
        !Number.isNaN(postRetirementAnnualIncome) && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Typography>
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
    </>
  );
}
