import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ title, data }) => {
  const chartData = {
    labels: ['Category 1', 'Category 2'],
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default Chart;
