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
  FormGroup
} from '@mui/material';
import NumberFormatPercentage from '../../NumberFormatPercentage';
import { INVESTMENT_STYLE_ENUM } from '../../../constants';

export default function MarketConditionsFormContent({
  commonFormStyles,
  preRetirementMeanRateOfReturn,
  postRetirementMeanRateOfReturn,
  preRetirementInvestmentStyle,
  postRetirementInvestmentStyle,
  inflationMean,
  adjustForInflation,
  touched,
  errors,
  handleChange,
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
    </>
  );
}
