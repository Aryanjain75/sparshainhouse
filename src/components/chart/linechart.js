"use client";
import React from 'react';
import LineChart from '@/components/linechart/linechart';

const ChartPage = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Looping tension 1',
        data: [65, 59, 80, 81, 26, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Looping tension 2',
        data: [75, 69, 90, 91, 36, 55, 30],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
      }
    ]
  };

  const options = {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100
      }
    }
  };

  return (
    <div className="border-2 border-gray-300 p-6 rounded-lg shadow-lg  mx-auto my-12" style={{width:"37vw"}}>
      <h1 className="text-2xl font-semibold mb-4 text-center">Analytics</h1>
      <LineChart data={data} options={options} />
    </div>
  );
};

export default ChartPage;
