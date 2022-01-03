import React from 'react';
import { Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { decimalToPercent } from '../../../utils/generalUtils';

ChartJS.register(ArcElement, Tooltip, Legend);
const portfolioSurvivalPlugins = [
  {
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const { ctx } = chart;
      ctx.restore();
      const fontSize = (height / 360).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      const text1 = 'Overall Portfolio';
      const text2 = 'Survival Rate';
      const text1X = Math.round((width - ctx.measureText(text1).width) / 2);
      const text2X = Math.round((width - ctx.measureText(text2).width) / 2);
      const text1Y = height / 2 - 10;
      const text2Y = height / 2 + 10;
      ctx.fillText(text1, text1X, text1Y);
      ctx.fillText(text2, text2X, text2Y);
      ctx.save();
    }
  }
];

const safeWithdrawalPlugins = [
  {
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const { ctx } = chart;
      ctx.restore();
      const fontSize = (height / 360).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      const text1 = 'Portfolio Survival';
      const text2 = 'on $XXk / year';
      const text1X = Math.round((width - ctx.measureText(text1).width) / 2);
      const text2X = Math.round((width - ctx.measureText(text2).width) / 2);
      const text1Y = height / 2 - 10;
      const text2Y = height / 2 + 10;
      ctx.fillText(text1, text1X, text1Y);
      ctx.fillText(text2, text2X, text2Y);
      ctx.save();
    }
  }
];

const portfolioSurvivalData = (roundedSurvivalRate, roundedDepletionRate) => ({
  labels: ['Did Not Run Out of Money', 'Did Run Out of Money'],
  datasets: [
    {
      label: 'Portfolio Survival',
      data: [roundedSurvivalRate, roundedDepletionRate],
      backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
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
      backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }
  ]
};

export default function Visualizations({ survivalRate }) {
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
          plugins={portfolioSurvivalPlugins}
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
          plugins={safeWithdrawalPlugins}
        />
      </Box>
    </Box>
  );
}
