import React from 'react';
import { Box, Typography } from '@mui/material';
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
      const text = 'Portfolio Survival';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);
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
      const text = 'Portfolio Survival on $XXk / year';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }
];

const portfolioSurvivalData = (roundedSurvivalRate, roundedDepletionRate) => ({
  labels: ['Did Not Run Out of Money', 'Did Run Out of Money'],
  datasets: [
    {
      label: 'Portfolio Survival',
      data: [roundedDepletionRate, roundedSurvivalRate],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
      borderWidth: 1
    }
  ]
});

const data = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      label: 'Portfolio Survival',
      data: [5, 95],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
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
          data={data}
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
