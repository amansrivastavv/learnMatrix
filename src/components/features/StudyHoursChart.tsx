
"use client";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StudyHoursChartProps {
  data: number[];
}

export function StudyHoursChart({ data }: StudyHoursChartProps) {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Hours',
        data: data,
        borderColor: '#8b5cf6', // Violet-500
        backgroundColor: 'rgba(139, 92, 246, 0.2)', // Violet-500 with opacity
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return <Line options={{ responsive: true }} data={chartData} />;
}
