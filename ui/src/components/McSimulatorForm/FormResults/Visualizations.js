import React from 'react';
import { Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { decimalToPercent } from '../../../utils/generalUtils';

ChartJS.register(ArcElement, Tooltip, Legend);
// eslint-disable-next-line arrow-body-style
const generatePortfolioSurvivalPlugins = (roundedSurvivalRate) => {
  return [
    {
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const { ctx } = chart;
        ctx.restore();
        const fontSize = (height / 360).toFixed(2);
        ctx.font = `bold ${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        const text1 = 'Portfolio Survival';
        const text2 = 'Rate:';
        const text3 = `${roundedSurvivalRate}%`;
        const text1X = Math.round((width - ctx.measureText(text1).width) / 2);
        const text2X = Math.round((width - ctx.measureText(text2).width) / 2);
        const text3X = Math.round((width - ctx.measureText(text3).width) / 2);
        const text1Y = height / 2 - 15;
        const text2Y = height / 2 + 5;
        const text3Y = height / 2 + 25;
        ctx.fillText(text1, text1X, text1Y);
        ctx.fillText(text2, text2X, text2Y);
        ctx.fillText(text3, text3X, text3Y);
        ctx.save();
      }
    }
  ];
};

const portfolioSurvivalData = (roundedSurvivalRate, roundedDepletionRate) => ({
  labels: ['Did Not Run Out of Money', 'Did Run Out of Money'],
  datasets: [
    {
      label: 'Portfolio Survival',
      data: [roundedSurvivalRate, roundedDepletionRate],
      backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }
  ]
});

const safeWithdrawalData = {
  labels: ['Did Not Run Out of Money', 'Did Run Out of Money'],
  datasets: [
    {
      label: 'Portfolio Survival',
      data: [95, 5],
      backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }
  ]
};

const formatToShortDollarAmount = (aDollarAmount) => {
  const asString = Math.trunc(aDollarAmount).toString();
  const numOfDigits = asString.length;
  if (numOfDigits >= 4) {
    const numDigitsToTruncate = numOfDigits - 3;
    return asString.substring(0, numDigitsToTruncate);
  }
  return 0;
};

const generateSafeWithdrawalPlugins = (safeWithdrawalAmount) => {
  const formattedSafeWithdrawalAmount =
    formatToShortDollarAmount(safeWithdrawalAmount);
  return [
    {
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const { ctx } = chart;
        ctx.restore();
        const fontSize = (height / 360).toFixed(2);
        ctx.font = `bold ${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        const text1 = 'Safe Withdrawal';
        const text2 = 'Amount:';
        const text3 = `$${formattedSafeWithdrawalAmount}k / year`;
        const text1X = Math.round((width - ctx.measureText(text1).width) / 2);
        const text2X = Math.round((width - ctx.measureText(text2).width) / 2);
        const text3X = Math.round((width - ctx.measureText(text3).width) / 2);
        const text1Y = height / 2 - 15;
        const text2Y = height / 2 + 5;
        const text3Y = height / 2 + 25;
        ctx.fillText(text1, text1X, text1Y);
        ctx.fillText(text2, text2X, text2Y);
        ctx.fillText(text3, text3X, text3Y);
        ctx.save();
      }
    }
  ];
};

export default function Visualizations({ survivalRate, safeWithdrawalAmount }) {
  const roundedSurvivalRate = decimalToPercent(survivalRate, false);
  const roundedDepletionRate = decimalToPercent(1 - survivalRate, false);
  return (
    <Box sx={{ display: 'flex', height: '20em', mb: 4, mt: 8 }}>
      <Box sx={{ position: 'relative', width: '50%' }}>
        <Doughnut
          data={portfolioSurvivalData(
            roundedSurvivalRate,
            roundedDepletionRate
          )}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }}
          plugins={generatePortfolioSurvivalPlugins(roundedSurvivalRate)}
        />
      </Box>
      <Box sx={{ position: 'relative', width: '50%' }}>
        <Doughnut
          data={safeWithdrawalData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }}
          plugins={generateSafeWithdrawalPlugins(safeWithdrawalAmount)}
        />
      </Box>
    </Box>
  );
}
