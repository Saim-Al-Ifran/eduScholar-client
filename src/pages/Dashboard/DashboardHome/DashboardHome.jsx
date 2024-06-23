import React from 'react';
import { useGetDashboardStatsQuery } from '../../../features/DashboardStats/dashboardStatsApi';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { PacmanLoader} from 'react-spinners';
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

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  const { data, isLoading, error } = useGetDashboardStatsQuery();

  if (isLoading) return <div className="flex justify-center items-center h-screen"><PacmanLoader
  color="#36d7b7"
  size={40}
/></div>;
  if (error) return <div>Error loading dashboard stats</div>;

  const stats = [
    { title: 'Users', value: data.totalUsers, icon: 'fa-users', bgColor: 'bg-blue-500' },
    { title: 'Moderators', value: data.totalModerators, icon: 'fa-user-pen', bgColor: 'bg-green-500' },
    { title: 'Admins', value: data.totalAdmins, icon: 'fa-user-secret', bgColor: 'bg-red-500' },
    { title: 'Applications', value: data.totalApplications, icon: 'fa-envelope', bgColor: 'bg-[#5A72A0]' },
    { title: 'Scholarships', value: data.totalScholarships, icon: 'fa-google-scholar', bgColor: 'bg-purple-500' },
    { title: 'Total Amount', value: `$${data.totalAmount.toLocaleString()}`, icon: 'fa-dollar-sign', bgColor: 'bg-indigo-500' },
    { title: 'Payments', value: data.totalPayments, icon: 'fa-money-check', bgColor: 'bg-teal-500' },
    { title: 'Payment Amount', value: `$${data.totalPaymentAmount.toLocaleString()}`, icon: 'fa-wallet', bgColor: 'bg-pink-500' },
  ];

  const chartData = {
    labels: stats.map(stat => stat.title),
    datasets: [
      {
        label: 'Count',
        data: stats.map(stat => typeof stat.value === 'string' ? parseFloat(stat.value.replace(/[^0-9.-]+/g, "")) : stat.value),
        backgroundColor: stats.map(stat => stat.bgColor),
        borderColor: stats.map(stat => stat.bgColor),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dashboard Statistics',
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className={`text-white ${stat.bgColor}`}>
            <CardBody className="flex items-center">
              <i className={`fa ${stat.icon} text-4xl mr-4`}></i>
              <div>
                <Typography variant="h5" className="font-bold">
                  {stat.title}
                </Typography>
                <Typography variant="h6" className="font-medium">
                  {stat.value}
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Card>
          <CardBody>
            <Bar data={chartData} options={chartOptions} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
