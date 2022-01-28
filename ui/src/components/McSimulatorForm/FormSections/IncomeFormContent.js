import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material';
import NumberFormat from 'react-number-format';
import NumberFormatPercentage from '../../NumberFormatPercentage';
import NumberFormatDollarAmount from '../../NumberFormatDollarAmount';
import { INVESTMENT_STYLE_ENUM } from '../../../constants';

export default function IncomeFormContent({
  commonFormStyles,
  postRetirementAnnualWithdrawal,
  postRetirementMeanRateOfReturn,
  postRetirementInvestmentStyle,
  additionalPostRetirementAnnualIncome,
  inflationMean,
  adjustForInflation,
  touched,
  errors,
  handleChange,
  setFieldValue,
  filingStatus,
  postRetirementAnnualIncome,
  postRetirementTaxRate,
  adjustWithdrawalsForTaxation,
  homeSaleNetProceeds
}) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1 }}>
          <FormControl sx={commonFormStyles.shortFormInput}>
            <TextField
              label={
                adjustWithdrawalsForTaxation
                  ? 'Post-Retirement Annual Withdrawal (Net)'
                  : 'Post-Retirement Annual Withdrawal (Gross)'
              }
              variant="outlined"
              value={postRetirementAnnualWithdrawal}
              onChange={handleChange}
              name="postRetirementAnnualWithdrawal"
              id="annual-withdrawal-post-retirement"
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
                touched.postRetirementAnnualWithdrawal &&
                Boolean(errors.postRetirementAnnualWithdrawal)
              }
              helperText={
                touched.postRetirementAnnualWithdrawal &&
                errors.postRetirementAnnualWithdrawal
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={commonFormStyles.shortFormInput}>
            <TextField
              label="Post-Retirement Supplemental Income"
              variant="outlined"
              value={additionalPostRetirementAnnualIncome}
              onChange={handleChange}
              name="additionalPostRetirementAnnualIncome"
              id="additional-annual-income"
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
                touched.additionalPostRetirementAnnualIncome &&
                Boolean(errors.additionalPostRetirementAnnualIncome)
              }
              helperText={
                touched.additionalPostRetirementAnnualIncome &&
                errors.additionalPostRetirementAnnualIncome
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ flex: 1 }} />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1 }}>
          <FormControl
            sx={commonFormStyles.shortFormInput}
            error={
              touched.postRetirementInvestmentStyle &&
              Boolean(errors.postRetirementInvestmentStyle)
            }
          >
            <InputLabel id="post-retirement-investment-style-label">
              Post-Retirement Investment Style
            </InputLabel>
            <Select
              labelId="post-retirement-investment-style-label"
              id="post-retirement-investment-style"
              label="Post-Retirement Investment Style"
              startAdornment={<InputAdornment position="start" />}
              endAdornment={<InputAdornment position="end" />}
              value={postRetirementInvestmentStyle}
              name="postRetirementInvestmentStyle"
              onChange={async (e) => {
                const selection = Object.values(INVESTMENT_STYLE_ENUM).find(
                  (i) => i.label === e.target.value
                );
                await handleChange(e);
                setFieldValue(
                  'postRetirementMeanRateOfReturn',
                  selection.postRetirementMeanRateOfReturn
                );
              }}
            >
              {Object.values(INVESTMENT_STYLE_ENUM).map((i) => (
                <MenuItem key={i.value} value={i.label}>
                  {i.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {touched.postRetirementInvestmentStyle &&
                errors.postRetirementInvestmentStyle}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={commonFormStyles.shortFormInput}>
            <TextField
              label="Post-Retirement Rate of Return"
              variant="outlined"
              value={postRetirementMeanRateOfReturn}
              onChange={handleChange}
              name="postRetirementMeanRateOfReturn"
              id="post-retirement-ror"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                inputComponent: NumberFormatPercentage,
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              error={
                touched.postRetirementMeanRateOfReturn &&
                Boolean(errors.postRetirementMeanRateOfReturn)
              }
              helperText={
                touched.postRetirementMeanRateOfReturn &&
                errors.postRetirementMeanRateOfReturn
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ flex: 1 }} />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1 }}>
          <TextField
            sx={commonFormStyles.shortFormInput}
            label="Home Sale Net Proceeds (At Retirement)"
            variant="outlined"
            value={homeSaleNetProceeds}
            onChange={handleChange}
            name="homeSaleNetProceeds"
            id="home-sale-net-proceeds-input"
            InputProps={{
              inputComponent: NumberFormatDollarAmount,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>
            }}
            error={
              touched.homeSaleNetProceeds && Boolean(errors.homeSaleNetProceeds)
            }
            helperText={
              touched.homeSaleNetProceeds && errors.homeSaleNetProceeds
            }
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{ flex: 1, display: 'flex', alignItems: 'end', height: '72px' }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={adjustForInflation}
                  name="adjustForInflation"
                  onChange={handleChange}
                />
              }
              label="Adjust for Inflation"
            />
          </FormGroup>
        </Box>
        {adjustForInflation && (
          <>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <FormControl sx={commonFormStyles.shortFormInput}>
                <TextField
                  label="Annual Inflation Mean"
                  variant="outlined"
                  value={inflationMean}
                  name="inflationMean"
                  onChange={handleChange}
                  id="inflation-mean"
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    inputComponent: NumberFormatPercentage,
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    )
                  }}
                  error={touched.inflationMean && Boolean(errors.inflationMean)}
                  helperText={touched.inflationMean && errors.inflationMean}
                />
              </FormControl>
            </Box>
            <Box sx={{ flex: 1 }} />
          </>
        )}
      </Box>
      <>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              height: '75px'
            }}
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
                label="Use Net Income For Withdrawals"
              />
            </FormGroup>
          </Box>
          {adjustWithdrawalsForTaxation && (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
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
            </Box>
          )}
          <Box sx={{ flex: 1 }} />
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
    </>
  );
}
