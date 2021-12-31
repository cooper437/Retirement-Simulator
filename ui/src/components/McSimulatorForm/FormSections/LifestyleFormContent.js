import React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

function LifestyleFormContent({
  commonFormStyles,
  currentAge,
  retirementAge,
  lifeExpectancy,
  touched,
  errors,
  handleChange
}) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <TextField
        sx={commonFormStyles.shortFormInput}
        id="current-age-input"
        label="Current Age"
        variant="outlined"
        type="number"
        name="currentAge"
        InputLabelProps={{
          shrink: true
        }}
        value={currentAge}
        onChange={handleChange}
        error={touched.currentAge && Boolean(errors.currentAge)}
        helperText={touched.currentAge && errors.currentAge}
      />
      <TextField
        sx={commonFormStyles.shortFormInput}
        id="retirement-age-input"
        label="Retirement Age"
        variant="outlined"
        type="number"
        name="retirementAge"
        InputLabelProps={{
          shrink: true
        }}
        value={retirementAge}
        onChange={handleChange}
        error={touched.retirementAge && Boolean(errors.retirementAge)}
        helperText={touched.retirementAge && errors.retirementAge}
      />
      <TextField
        sx={commonFormStyles.shortFormInput}
        id="life-expectancy-input"
        label="Life Expectancy"
        variant="outlined"
        type="number"
        name="lifeExpectancy"
        InputLabelProps={{
          shrink: true
        }}
        value={lifeExpectancy}
        onChange={handleChange}
        error={touched.lifeExpectancy && Boolean(errors.lifeExpectancy)}
        helperText={touched.lifeExpectancy && errors.lifeExpectancy}
      />
    </Box>
  );
}

export default LifestyleFormContent;
