
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
          'rgba(139, 92, 246, 0.8)', // Violet
          'rgba(14, 165, 233, 0.8)', // Sky
          'rgba(244, 63, 94, 0.8)',  // Rose
          'rgba(234, 179, 8, 0.8)',  // Yellow
        ],
        borderRadius: 4,
      },
    ],
  };

  return <Bar options={{ responsive: true }} data={chartData} />;
}
