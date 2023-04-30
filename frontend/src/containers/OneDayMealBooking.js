import React, { useState, useEffect } from "react";
import axios from "axios";

const OneDayMealBooking = () => {
  const [donatorId, setDonatorId] = useState("");
  const [dateOfBooking, setDateOfBooking] = useState("");
  const [orphanageId, setOrphanageId] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    // Fetch existing meal donations from Django API
    const fetchMealDonations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/orphanage/mealdonations/${orphanageId}`
        );
        if (Array.isArray(response.data)) {
          setBookedDates(
            response.data.map((mealDonation) => mealDonation.date_of_booking)
          );
        } else {
          console.error(
            "Failed to fetch meal donations: response data is not an array"
          );
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch meal donations.");
      }
    };
    if (orphanageId) {
      fetchMealDonations();
    }
  }, [orphanageId]);

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the selected date is already booked
      if (bookedDates.includes(dateOfBooking)) {
        alert(
          "The selected date is already booked. Please choose another date."
        );
        return;
      }
      // Send POST request to create a new meal donation
      await axios.post(
        `${process.env.REACT_APP_API_URL}/orphanage/createmealdonations/`,
        {
          donator: donatorId,
          date_of_booking: dateOfBooking,
          orphanage_id: orphanageId,
        }
      );
      // Reset form fields
      setDonatorId("");
      setDateOfBooking("");
      setBookedDates([...bookedDates, dateOfBooking]);
      alert("Meal donation booked successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to book meal donation.");
    }
  };

  return (
    <div>
      <h2>Book a Meal Donation</h2>
      <form onSubmit={handleDonationSubmit}>
        <label>
          Donator ID:
          <input
            type="number"
            value={donatorId}
            onChange={(e) => setDonatorId(e.target.value)}
          />
        </label>
        <label>
          Date of Booking:
          <input
            type="date"
            value={dateOfBooking}
            onChange={(e) => setDateOfBooking(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Disable past dates
            max={
              bookedDates.length > 0
                ? Math.max(
                    ...bookedDates.map(
                      (date) => new Date(date).toISOString().split("T")[0]
                    )
                  )
                : null
            } // Disable already booked dates
          />
        </label>
        <label>
          Orphanage ID:
          <input
            type="number"
            value={orphanageId}
            onChange={(e) => setOrphanageId(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OneDayMealBooking;
