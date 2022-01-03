import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import NumberFormat from 'react-number-format';
import { SECTION_BACKGROUND_COLOR } from '../../../colors';

const decimalToPercent = (aDecimal) => {
  const asPercent = aDecimal * 100;
  const rounded = Math.round(asPercent * 100) / 100;
  return `${rounded}%`;
};

const rowHeaders = [
  'Pre-Retirement Mean Rate Of Return',
  'Post-Retirement Mean Rate Of Return',
  'Wealth Transfer Amount',
  'Post-Retirement Safe Withdrawal Rate'
];

const rows = [
  {
    key: 'preRetirementRateOfReturn',
    label: 'Pre-Retirement Mean Rate Of Return',
    formatAs: 'percent'
  },
  {
    key: 'postRetirementRateOfReturn',
    label: 'Post-Retirement Mean Rate Of Return',
    formatAs: 'percent'
  },
  {
    key: 'balanceAtEol',
    label: 'Wealth Transfer Amount',
    formatAs: 'dollar'
  },
  {
    key: 'safeWithdrawalRate',
    label: 'Post-Retirement Safe Withdrawal Rate',
    formatAs: 'percent'
  }
];

// eslint-disable-next-line no-unused-vars
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}));

const conditionalCellDisplayFormat = (formatAs, cellValue) => {
  switch (formatAs) {
    case 'percent':
      return decimalToPercent(cellValue);
    case 'dollar':
      return (
        <NumberFormat
          thousandsGroupStyle="thousand"
          value={cellValue.toString()}
          prefix="$"
          decimalSeparator="."
          decimalScale={0}
          displayType="text"
          type="text"
          thousandSeparator
          allowNegative
        />
      );
    default:
      return cellValue;
  }
};

export default function SummaryStatsTable({ quantileStatistics }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="center">10th Percentile</StyledTableCell>
            <StyledTableCell align="center">25th Percentile</StyledTableCell>
            <StyledTableCell align="center">50th Percentile</StyledTableCell>
            <StyledTableCell align="center">75th Percentile</StyledTableCell>
            <StyledTableCell align="center">90th Percentile</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={
                index % 2
                  ? { background: SECTION_BACKGROUND_COLOR }
                  : { background: 'white' }
              }
            >
              {' '}
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              {Object.values(quantileStatistics)
                .map((i) => i[row.key])
                .map((cellValue, innerIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableCell key={`${index}-${innerIndex}`} align="center">
                    {conditionalCellDisplayFormat(row.formatAs, cellValue)}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
