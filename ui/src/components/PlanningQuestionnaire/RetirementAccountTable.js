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
  Box,
  Typography
} from '@mui/material';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@mui/icons-material/Delete';
import { SECTION_BACKGROUND_COLOR } from '../../colors';
import { INVESTMENT_STYLE_ENUM, ACCOUNT_TYPES_ENUM } from '../../constants';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}));

const getInvestingStyleLabel = (value) => {
  const selection = Object.values(INVESTMENT_STYLE_ENUM).find(
    (i) => i.value === value
  );
  return selection.label;
};

const getAccountTypeLabel = (value) => {
  const selection = Object.values(ACCOUNT_TYPES_ENUM).find(
    (i) => i.value === value
  );
  return selection.label;
};

const renderEmptyTable = () => (
  <TableBody>
    <TableRow>
      <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
        <Typography>Add some accounts using the form below.</Typography>
      </TableCell>
    </TableRow>
  </TableBody>
);

export default function RetirementAccountTable({
  accounts,
  onClickRemoveAccount
}) {
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
          {accounts.length ? (
            <TableBody>
              {accounts.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  style={
                    index % 2
                      ? { background: SECTION_BACKGROUND_COLOR }
                      : { background: 'white' }
                  }
                >
                  <TableCell align="center">
                    {getAccountTypeLabel(row.accountType)}
                  </TableCell>
                  <TableCell align="center">
                    <NumberFormat
                      thousandsGroupStyle="thousand"
                      value={row.portfolioBalance}
                      prefix="$"
                      decimalSeparator="."
                      decimalScale={0}
                      displayType="text"
                      type="text"
                      thousandSeparator
                    />
                  </TableCell>
                  <TableCell align="center">
                    {getInvestingStyleLabel(row.investingStyle)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => onClickRemoveAccount(row.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            renderEmptyTable()
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
