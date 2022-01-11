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
  return <>Nothin</>;
}
