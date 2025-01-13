// src/components/Analytics.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function Analytics({ data }) {
    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Student Engagement',
                data: data.map(item => item.engagement),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Course Analytics</h1>
            <div className="course-analytics">
                <Line data={chartData} />
            </div>
        </div>
    );
}

export default Analytics;
