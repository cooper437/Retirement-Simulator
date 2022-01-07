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
import { numberWithCommas } from '../../../utils/generalUtils';

export const CHART_COLORS = {
  red: ['rgb(255, 99, 132)', 'rgba(255, 99, 132, 0.5)'],
  orange: ['rgb(255, 159, 64)', 'rgba(255, 159, 64, 0.5)'],
  yellow: ['rgb(255, 205, 86)', 'rgba(255, 205, 86, 0.5)'],
  green: ['rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.5)'],
  blue: ['rgb(54, 162, 235)', 'rgba(54, 162, 235, 0.5)'],
  purple: ['rgb(153, 102, 255)', 'rgba(153, 102, 255, 0.5)'],
  grey: ['rgb(201, 203, 207)', 'rgba(201, 203, 207, 0.5)']
};

const NAMED_COLORS = [
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.grey
];

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
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Balance (Post-Inflation)'
      },
      ticks: {
        // Include a dollar sign and commas in the ticks
        callback(value) {
          return `$${numberWithCommas(value)}`;
        }
      }
    },
    x: {
      title: {
        display: true,
        text: 'Year'
      }
    }
  }
};

const formatLineLabel = (percentileValue) =>
  `${percentileValue * 100}th Percentile`;

const constructChartData = (quantileStatistics) => {
  const currentYear = new Date().getFullYear();
  const firstAvailableQuantile = Object.keys(quantileStatistics)[0];
  const numYears = quantileStatistics[firstAvailableQuantile].balances.length;
  const labels = [...Array(numYears).keys()].map((i) => i + currentYear);
  const datasets = Object.entries(quantileStatistics).map(
    ([key, value], index) => ({
      label: formatLineLabel(key),
      data: value.balances,
      borderColor: NAMED_COLORS[index][0],
      backgroundColor: NAMED_COLORS[index][1]
    })
  );
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
