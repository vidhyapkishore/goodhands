import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Progress_bar from "./Progressbar";
import { connect } from "react-redux";

function Orphanages_Details({
  iid,
  user_login,
  address,
  email,
  phone,
  city,
  country,
  statee,
  zip_code,
  namee,
}) {
  const { state } = useLocation();
  const [needs, setNeed] = useState([]);
  const [posts, setPost] = useState([]);
  const navigate = useNavigate(); //defining navigate object using useNavigate hook

  const [donatorId, setDonatorId] = useState("");
  const [dateOfBooking, setDateOfBooking] = useState("");
  const [orphanageId, setOrphanageId] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    refreshPost();
    refreshNeed();
    // Fetch existing meal donations from Django API
    const fetchMealDonations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/orphanage/mealdonations/${state.id}`
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
    if (state.id) {
      fetchMealDonations();
    }
  }, [state.id]);

  const handleDonationSubmit = async (e) => {
    
    console.log(iid,dateOfBooking,state.id)
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
          donator: iid,
          date_of_booking: dateOfBooking,
          orphanage_id: state.id,
        }
      );
      // Reset form fields

      setDateOfBooking("");
      setBookedDates([...bookedDates, dateOfBooking]);
      alert("Meal donation booked successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to book meal donation.");
    }
  };
  function calcpercent(raised, goal) {
    return (raised / goal) * 100;
  }
  const refreshNeed = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orphanage/${state.id}/needs/`)
      .then((res) => {
        setNeed(res.data);
      })
      .catch((err) => console.log(err));
  };

  const Donate = (goal) => {
    navigate("/donationform", {
      state: {
        need: goal.title,
        need_id: goal.id,
        donator: iid,
        orphanage: state.name,
        raised: goal.raised,
        orphanage_id: state.id,
        goal: goal.goal,
      },
    });
  };
  const refreshPost = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orphanage/${state.id}/gallery/`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>{state.name}</h2>
            </div>
            <div className="col-12">
              <a href="">Home</a>
              <a href="">{state.name}</a>
            </div>
          </div>
        </div>
      </div> */}

      <div className="single">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h5 className="single-bioo border-bottom border p-2">
                {state.name}
              </h5>
              <div className="single-bio mb-3">
                <div className="single-bio-text">
                  <p className="w_25">
                    <b>
                      <u>Address</u>
                    </b>
                  </p>
                  <p className="w_75 pl-2">
                    {state.address}
                    <br />
                    {state.city}
                    <br />
                    {state.country}
                    <br />
                    {state.zip_code}
                  </p>
                  <p className="w_25">
                    <b>
                      <u>Phone</u>
                    </b>
                  </p>
                  <p className="w_75 pl-2">{state.phone}</p>
                  <p className="w_25">
                    <b>
                      <u>Email</u>
                    </b>
                  </p>
                  <p className="w_75 pl-2">{state.email}</p>
                </div>
              </div>
              <div className="card-black px-2 py-3">
                <h5 className="card-black border-0 card-header  ">
                  One day meal booking
                </h5>
                <div className="px-4">
                  <form onSubmit={handleDonationSubmit}>
                    <input
                    className="col-8 border-0 p-1"
                      type="date"                      
                      value={dateOfBooking}
                      onChange={(e) => setDateOfBooking(e.target.value)}
                      min={new Date().toISOString().split("T")[0]} // Disable past dates
                      max={
                        bookedDates.length > 0
                          ? Math.max(
                              ...bookedDates.map(
                                (date) =>
                                  new Date(date).toISOString().split("T")[0]
                              )
                            )
                          : null
                      } // Disable already booked dates
                    />
                    <button className="col-4 btn-meal" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-8 ">
              <h5 className="card-header mb-2">Needs</h5>
              {needs.length > 0 ? (
                needs.map((obj) => {
                  // Check if goal is not equal to raised
                  if (obj.goal !== obj.raised) {
                    return (
                      <div className="card causes mb-3" key={obj.id}>
                        <div className="causes-item">
                          <div className="causes-text mt-3">
                            <h3>
                              {obj.title}
                              {obj.id}
                            </h3>
                            <p>{obj.description}</p>
                          </div>
                          <div className="causes-progress">
                            <div className="progress_bar">
                              <Progress_bar
                                bgcolor="orange"
                                progress={calcpercent(obj.raised, obj.goal)}
                                height={30}
                              ></Progress_bar>
                            </div>
                            <div className="progress-text">
                              <p>
                                <strong>Raised:</strong> ${obj.raised}
                              </p>
                              <p>
                                <strong>Goal:</strong> ${obj.goal}
                              </p>
                            </div>
                          </div>
                          <div className="donate-btn">
                            <a
                              onClick={() => Donate(obj)}
                              className="btn btn-custom"
                            >
                              Donate Now
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null; // Return null if goal is equal to raised
                  }
                })
              ) : (
                <p>No needs yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
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
// export default connect(mapStateToProps)(User_Dashboard);

export default connect(mapStateToProps)(Orphanages_Details);
