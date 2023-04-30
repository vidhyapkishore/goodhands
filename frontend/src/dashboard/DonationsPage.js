import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const DonationsPage = ({iid}) => {
  const [donations, setDonations] = useState([]);
  const [weekly_donations, setWeeklyDonations] = useState([]);
  const [monthly_donations, setMonthlyDonations] = useState([]);
  const [total_donations, setTotalDonations] = useState([]);
  
  const [weeklyDonation, setWeeklyDonation] = useState(0);
  const [monthlyDonation, setMonthlyDonation] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  useEffect(() => {
    // Fetch donations data from API endpoint
    axios.get(`${process.env.REACT_APP_API_URL}/orphanage/${iid}/donationdate/`).then((response) => {
      setDonations(response.data);
      setWeeklyDonations(response.data.weekly_donations);
      setMonthlyDonations(response.data.monthly_donations);
      setTotalDonations(response.data.total_donation);
    });
  }, []);

  useEffect(() => {
    // Filter donations for the current week
    const currentDate = new Date();
    const startOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const filteredWeeklyDonations = donations.weekly_donations.filter(
  (donation) => new Date(donation.date) > startOfWeek
);
    // Calculate total donation amount for the week
    const totalWeeklyDonation = filteredWeeklyDonations.reduce(
      (total, donation) => total + donation.amount,
      0
    );
    setWeeklyDonation(totalWeeklyDonation);
  }, [donations]);

  useEffect(() => {
    // Filter donations for the current month
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const filteredMonthlyDonations = donations.filter(
      (donation) => new Date(donation.date) > startOfMonth
    );
    // Calculate total donation amount for the month
    const totalMonthlyDonation = filteredMonthlyDonations.reduce(
      (total, donation) => total + donation.amount,
      0
    );
    setMonthlyDonation(totalMonthlyDonation);
  }, [donations]);

  useEffect(() => {
    // Calculate total donation amount
    const totalDonationAmount = donations.reduce(
      (total, donation) => total + donation.amount,
      0
    );
    setTotalDonation(totalDonationAmount);
  }, [donations]);

  return (
    <div>
      <h1>Donation App Dashboard</h1>
      <div>
        <h2>Weekly Donation Amount: {weeklyDonation}</h2>
        {/* Display weekly donation amount */}
      </div>
      <div>
        <h2>Monthly Donation Amount: {monthlyDonation}</h2>
        {/* Display monthly donation amount */}
      </div>
      <div>
        <h2>Total Donation Amount: {totalDonation}</h2>
        {/* Display total donation amount */}
      </div>
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
export default connect(mapStateToProps)(DonationsPage);
