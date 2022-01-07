import React from 'react';
import NumberFormat from 'react-number-format';

export default React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
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
