import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from "react-redux";

const ChartPage = ({ iid }) => {
  const [donationData, setDonationData] = useState(null);

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orphanage/${iid}/donationdate/`);
        const data = await response.json();
        setDonationData(data);
      } catch (error) {
        console.error('Failed to fetch donation data', error);
      }
    };
    fetchDonationData();
  }, [iid]);

  if (!donationData) {
    return <div>Loading...</div>;
  }

  const weeklyChartData = {
    labels: ['Total Donation', 'Donated Amount'],
    datasets: [
      {
        label: 'Weekly Donation Information',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [donationData.total_donation, donationData.weekly_donations[0].donated],
      },
    ],
  };

  const totalChartData = {
    labels: ['Total Donation'],
    datasets: [
      {
        label: 'Total Donation Information',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [donationData.total_donation],
      },
    ],
  };

  const monthlyChartData = {
    labels: ['Total Donation', 'Donated Amount'],
    datasets: [
      {
        label: 'Monthly Donation Information',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [donationData.total_donation, donationData.monthly_donations[0].donated],
      },
    ],
  };

  return (
    <div>
      <h1>Weekly Donation Chart</h1>
      <Bar data={weeklyChartData} />
      <h1>Total Donation Chart</h1>
      <Bar data={totalChartData} />
      <h1>Monthly Donation Chart</h1>
      <Bar data={monthlyChartData} />
    </div>
  );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    phone: state.auth.phone,
    namee: state.auth.namee,
    email: state.auth.email,
    user_login: state.auth.user_login,
    user: state.auth.user,
    iid: state.auth.id,
    address: state.auth.address,
    zip_code: state.auth.zip_code,
    city: state.auth.city,
    statee: state.auth.state,
    country: state.auth.country,
  });
  export default connect(mapStateToProps)(ChartPage);
