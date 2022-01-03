import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SECTION_BACKGROUND_COLOR } from '../../../colors';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Pre-Retirement Mean Rate Of Return', 159, 6.0, 24, 4.0),
//   createData('Post-Retirement Mean Rate Of Return', 237, 9.0, 37, 4.3),
//   createData('Wealth Transfer Amount', 262, 16.0, 24, 6.0),
//   createData('Post-Retirement Safe Withdrawal Rate', 305, 3.7, 67, 4.3)
// ];

const rowHeaders = [
  'Pre-Retirement Mean Rate Of Return',
  'Post-Retirement Mean Rate Of Return',
  'Wealth Transfer Amount',
  'Post-Retirement Safe Withdrawal Rate'
];

const rows = [
  {
    key: 'preRetirementRateOfReturn',
    label: 'Pre-Retirement Mean Rate Of Return'
  },
  {
    key: 'postRetirementRateOfReturn',
    label: 'Post-Retirement Mean Rate Of Return'
  },
  {
    key: 'balanceAtEol',
    label: 'Wealth Transfer Amount'
  }
];

// eslint-disable-next-line no-unused-vars
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}));

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
                    {cellValue}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
