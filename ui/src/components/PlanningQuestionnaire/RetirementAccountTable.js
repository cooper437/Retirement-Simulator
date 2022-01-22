import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box
} from '@mui/material';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@mui/icons-material/Delete';
import { SECTION_BACKGROUND_COLOR } from '../../colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}));

function createData(accountType, balance, investingStyle) {
  return { accountType, balance, investingStyle };
}

const rows = [
  createData('401k', 1590000, 'Aggressive'),
  createData('IRA', 237000, 'Aggressive'),
  createData('401k', 262000, 'Conservative')
];

export default function RetirementAccountTable() {
  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 500 }}
          size="small"
          aria-label="retirement-accounts-table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Account Type</StyledTableCell>
              <StyledTableCell align="center">Balance</StyledTableCell>
              <StyledTableCell align="center">Investing Style</StyledTableCell>
              <StyledTableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.accountType}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                style={
                  index % 2
                    ? { background: SECTION_BACKGROUND_COLOR }
                    : { background: 'white' }
                }
              >
                <TableCell align="center">{row.accountType}</TableCell>
                <TableCell align="center">
                  {' '}
                  <NumberFormat
                    thousandsGroupStyle="thousand"
                    value={row.balance}
                    prefix="$"
                    decimalSeparator="."
                    decimalScale={0}
                    displayType="text"
                    type="text"
                    thousandSeparator
                  />
                </TableCell>
                <TableCell align="center">{row.investingStyle}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
