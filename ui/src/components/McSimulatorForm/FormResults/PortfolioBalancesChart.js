/* eslint-disable no-console */
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false,
      text: 'Portfolio Balances By Quantile'
    }
  }
};

const constructChartData = (quantileStatistics) => {
  const firstAvailableQuantile = Object.keys(quantileStatistics)[0];
  const numYears = quantileStatistics[firstAvailableQuantile].balances.length;
  const labels = [...Array(numYears).keys()].map((i) => i + 1);
  const datasets = Object.entries(quantileStatistics).map(([key, value]) => ({
    label: key,
    data: value.balances,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)'
  }));
  const data = {
    labels,
    datasets
  };
  return data;
};

export default function PortfolioBalancesChart({ quantileStatistics }) {
  if (quantileStatistics) {
    const data = constructChartData(quantileStatistics);
    return <Line options={options} data={data} />;
  }
  return null;
}
