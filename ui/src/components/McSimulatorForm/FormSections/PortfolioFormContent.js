import React from 'react';
import {
  Box,
  FormControl,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import NumberFormatDollarAmount from '../../NumberFormatDollarAmount';
import NumberFormatPercentage from '../../NumberFormatPercentage';
import { INVESTMENT_STYLE_ENUM } from '../../../constants';

export default function PortfolioFormContent({
  commonFormStyles,
  initialPortfolioAmount,
  preRetirementAnnualContribution,
  postRetirementAnnualWithdrawal,
  additionalPostRetirementAnnualIncome,
  adjustContributionsForIncomeGrowth,
  incomeGrowthMean,
  touched,
  errors,
  handleChange,
  preRetirementMeanRateOfReturn,
  postRetirementMeanRateOfReturn,
  preRetirementInvestmentStyle,
  postRetirementInvestmentStyle,
  inflationMean,
  adjustForInflation,
  setFieldValue
}) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Initial Amount"
            variant="outlined"
            value={initialPortfolioAmount}
            onChange={handleChange}
            name="initialPortfolioAmount"
            id="initial-portfolio-amount"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: NumberFormatDollarAmount,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>
            }}
            error={
              touched.initialPortfolioAmount &&
              Boolean(errors.initialPortfolioAmount)
            }
            helperText={
              touched.initialPortfolioAmount && errors.initialPortfolioAmount
            }
          />
        </FormControl>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <FormControl sx={{ ...commonFormStyles.shortFormInput }}>
          <TextField
            label="Annual Contribution Pre-Retirement"
            variant="outlined"
            value={preRetirementAnnualContribution}
            onChange={handleChange}
            name="preRetirementAnnualContribution"
            id="annual-contribution-pre-retirement"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: NumberFormatDollarAmount,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>
            }}
            error={
              touched.preRetirementAnnualContribution &&
              Boolean(errors.preRetirementAnnualContribution)
            }
            helperText={
              touched.preRetirementAnnualContribution &&
              errors.preRetirementAnnualContribution
            }
          />
        </FormControl>
        <FormGroup sx={{ justifyContent: 'end' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={adjustContributionsForIncomeGrowth}
                name="adjustContributionsForIncomeGrowth"
                onChange={handleChange}
              />
            }
            label="Adjust for Income Growth"
          />
        </FormGroup>
        {adjustContributionsForIncomeGrowth ? (
          <Box>
            <FormControl sx={{ ...commonFormStyles.shortFormInput }}>
              <TextField
                label="Annual Income Growth Mean"
                variant="outlined"
                value={incomeGrowthMean}
                onChange={handleChange}
                name="incomeGrowthMean"
                id="income-growth-mean"
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
                  touched.incomeGrowthMean && Boolean(errors.incomeGrowthMean)
                }
                helperText={touched.incomeGrowthMean && errors.incomeGrowthMean}
              />
            </FormControl>
          </Box>
        ) : (
          <Box sx={{ width: '259px' }} />
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1 }}>
          <FormControl
            sx={commonFormStyles.shortFormInput}
            error={
              touched.preRetirementInvestmentStyle &&
              Boolean(errors.preRetirementInvestmentStyle)
            }
          >
            <InputLabel id="pre-retirement-investment-style-label">
              Pre-Retirement Investment Style
            </InputLabel>
            <Select
              labelId="pre-retirement-investment-style-label"
              id="pre-retirement-investment-style"
              label="Pre-Retirement Investment Style"
              startAdornment={<InputAdornment position="start" />}
              endAdornment={<InputAdornment position="end" />}
              value={preRetirementInvestmentStyle}
              name="preRetirementInvestmentStyle"
              onChange={async (e) => {
                const selection = Object.values(INVESTMENT_STYLE_ENUM).find(
                  (i) => i.label === e.target.value
                );
                await handleChange(e);
                setFieldValue(
                  'preRetirementMeanRateOfReturn',
                  selection.preRetirementMeanRateOfReturn
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
              {touched.preRetirementInvestmentStyle &&
                errors.preRetirementInvestmentStyle}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
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
        <Box sx={{ flex: 1 }} />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1 }}>
          <FormControl sx={commonFormStyles.shortFormInput}>
            <TextField
              label="Pre-Retirement Rate of Return"
              variant="outlined"
              value={preRetirementMeanRateOfReturn}
              onChange={handleChange}
              name="preRetirementMeanRateOfReturn"
              id="pre-retirement-ror"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                inputComponent: NumberFormatPercentage,
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              error={
                touched.preRetirementMeanRateOfReturn &&
                Boolean(errors.preRetirementMeanRateOfReturn)
              }
              helperText={
                touched.preRetirementMeanRateOfReturn &&
                errors.preRetirementMeanRateOfReturn
              }
            />
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
        height="72px"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1 }}>
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
        )}
        <Box sx={{ flex: 1 }} />
      </Box>
      <Box>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Annual Net Withdrawal Post-Retirement"
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
              endAdornment: <InputAdornment position="end">.00</InputAdornment>
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
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Post-Retirement Additional Annual Income"
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
              endAdornment: <InputAdornment position="end">.00</InputAdornment>
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        height="72px"
      >
        <Box sx={{ flex: 1 }} />
      </Stack>
    </>
  );
}
