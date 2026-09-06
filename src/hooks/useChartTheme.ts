// Shared Chart.js theme configuration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';

// Register once at module load
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const cyberChartColors = {
  cyan: 'rgba(0, 242, 254, 1)',
  cyanSoft: 'rgba(0, 242, 254, 0.6)',
  purple: 'rgba(121, 40, 202, 1)',
  purpleSoft: 'rgba(121, 40, 202, 0.6)',
  indigo: 'rgba(67, 56, 202, 1)',
  grid: 'rgba(255, 255, 255, 0.06)',
  text: 'rgba(156, 163, 175, 0.8)',
};

export const baseChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1200,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(9, 10, 15, 0.95)',
      titleColor: '#f3f4f6',
      bodyColor: '#9ca3af',
      borderColor: 'rgba(0, 242, 254, 0.3)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: cyberChartColors.grid,
      },
      ticks: {
        color: cyberChartColors.text,
        font: {
          family: '"JetBrains Mono", monospace',
          size: 10,
        },
      },
    },
    y: {
      grid: {
        color: cyberChartColors.grid,
      },
      ticks: {
        color: cyberChartColors.text,
        font: {
          family: '"JetBrains Mono", monospace',
          size: 10,
        },
      },
    },
  },
};
