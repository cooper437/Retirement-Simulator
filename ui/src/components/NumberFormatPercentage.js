import React from 'react';
import NumberFormat from 'react-number-format';

const MAX_VAL = 100;
const withValueLimit = ({ floatValue }) => {
  if (typeof floatValue === 'undefined') return true;
  return floatValue <= MAX_VAL;
};

export default React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      isAllowed={withValueLimit}
      allowNegative={false}
      decimalScale={2}
      fixedDecimalScale
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      isNumericString
    />
  );
});
