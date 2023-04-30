import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import donate from "../img/donate.jpg";

const DonationForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // const [datee, setDate] = useState(currentDate.toISOString()); // Set initial date value to today
  const [donator, setDonator] = useState(state.donator);
  const [raised, setRaised] = useState(state.raised);
  const [needs, setNeeds] = useState(state.need_id);
  const [donated, setDonated] = useState("");
  console.log(raised);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const r = parseFloat(raised) + parseFloat(donated);
      const b = parseFloat(state.goal) + parseFloat(raised);
      console.log(raised);
      console.log(r);
      if (r <= state.goal) {
        // Make API POST request to create a new donation
        await axios.post(
          `${process.env.REACT_APP_API_URL}/orphanage/donations/`,
          { donator, needs, donated }
        );
        // Reset form fields
        try {
          // Replace the URL with your Django REST framework API endpoint
          const response = await axios.patch(
            `${process.env.REACT_APP_API_URL}/orphanage/${needs}/needs_create/`,
            { orphanage: state.orphanage_id, raised: r }
          );
          console.log(response.data);
        } catch (error) {
          console.log(error.response.data.error);
        }
        setDonated("");
        // Handle success or display an alert
        alert("Donation submitted successfully!");
      } else {
        alert("Amount requires is less than you donated"+"amount required to reach goal:"+b);
      }
    } catch (error) {
      // Handle error or display an alert
      alert("Failed to submit donation. Please try again.");
    }

    navigate("/orphanages");
  };

  return (
    <div>
      <div className="container">
        {/* Donate section with parallax image */}
        <div className="donate" data-parallax="scroll" data-image-src={donate}>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="donate-content">
                {/* Section header with login text */}
                <div className="section-header">
                  <h2>Donation</h2>
                </div>
                <div className="donate-text">
                  <p>
                    Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi.
                    Curabitur facilisis ornare velit non. Aliquam metus tortor,
                    auctor id gravida, viverra quis sem. Curabitur non nisl nec
                    nisi maximus. Aenean convallis porttitor. Aliquam interdum
                    at lacus non blandit.
                  </p>
                </div>
              </div>
            </div>
            {/* Login form */}
            <div className="col-lg-8">
              <div className="donate-form">
                <div className="about-tab">
                  <form onSubmit={handleSubmit}>
                    <div className="control-group">
                      Your donation will be used for {needs} of{" "}
                      {state.orphanage}
                    </div>
                    <div className="control-group">
                      <input
                        className="form-control"
                        type="number"
                        value={donated}
                        placeholder="Donation"
                        onChange={(e) => setDonated(e.target.value)}
                      />
                    </div>
                    {/* Login button */}
                    <div>
                      <button className="btn btn-custom" type="submit">
                        Donate
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
