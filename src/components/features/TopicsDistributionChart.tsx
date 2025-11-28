
"use client";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TopicsDistributionChartProps {
  data: Record<string, number>;
}

export function TopicsDistributionChart({ data }: TopicsDistributionChartProps) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Questions Solved',
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
      },
    ],
  };

  return <Bar options={{ responsive: true }} data={chartData} />;
}
