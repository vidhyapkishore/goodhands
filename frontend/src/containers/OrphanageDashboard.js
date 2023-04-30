// Import necessary modules
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Progress_bar from "./Progressbar";

function OrphanageDashboard({
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
  password,
}) {
  // Define variables and states
  const [mealPrice, setMealPrice] = useState(0);
  const [error, setError] = useState(null);
  const [meal, setMeal] = useState(null); // Added state for existing meal
  const navigate = useNavigate();
  const [submitMessage, setSubmitMessage] = useState(null);
  const [mealMessage, setMealMessage] = useState(null);
  const [donation, setDonation] = useState([]);
  const [mealDonation, setMealDonation] = useState([]);


  const [formData, setFormData] = useState({
    orphanage: iid,
    title: "",
    goal: "",
    description: "",
  });
  const [posts, setPost] = useState([]);
  const { title, goal, description } = formData;
  // Use useEffect hook to check if user login is 'orphanage'
  useEffect(() => {
    if (user_login !== "orphanage") {
      navigate("/");
    }
    // Refresh donation and post data
    refreshPost();
    refreshDonation();
    refreshNeed();
    fetchMeal();
    fetchDonation();

  }, []);
  // Function to refresh donation data
  const refreshDonation = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orphanage/${iid}/donation/`)
      .then((res) => {
        setDonation(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Function to refresh post data
  const refreshPost = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orphanage/${iid}/gallery/`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to submit form data
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/orphanage/needs_create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      // Handle response as needed
      const data = await response.json();
      console.log(data);
      setFormData({
        orphanage: iid,
        title: "",
        goal: "",
        description: "",
      });
      // Set submit message
      setSubmitMessage("Need added successfully!");
      // Remove submit message after 3 seconds
      setTimeout(() => {
        setSubmitMessage(null);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const [needs, setNeed] = useState([]);

  const fetchMeal = async () => {
    try {
      // Replace the URL with your Django REST framework API endpoint
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orphanage/meals/${iid}/`
      );
      setMeal(response.data[0]); // Update meal state with fetched data
      setMealPrice(response.data[0].day_meal_price); // Prefill form with existing meal_price value
    } catch (error) {
      setError("Error fetching meal data");
    }
  };

  const fetchDonation = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orphanage/mealdonations/${iid}/`
      );
      setMealDonation(response.data);
     console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  function calcpercent(raised, goal) {
    return (raised / goal) * 100;
  }
  const refreshNeed = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orphanage/${iid}/needs/`)
      .then((res) => {
        setNeed(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleJoinRoom = useCallback((mail) =>{
    // Navigating user to '/room/{value}' when this function is called
    navigate(`/room/${generateRandomCode()}`)
    console.log(mail,)
  },[navigate])

  const generateRandomCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
    let code = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        // Check if mealPrice is a valid number
        if (!isNaN(mealPrice)) {
          // Replace the URL with your Django REST framework API endpoint
          const response = await axios.patch(
            `${process.env.REACT_APP_API_URL}/orphanage/meals/${iid}/`,
            { day_meal_price: mealPrice }
          );
          // Handle response as needed
        } else {
          setError("Meal price must be a valid number");
        }
        setMealMessage("Meal price updated successfully!");
      // Remove submit message after 3 seconds
      setTimeout(() => {
        setMealMessage(null);
      }, 3000);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  // Render dashboard UI
  return (
    <div className="single my-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h5 className="single-bioo border-bottom border p-2">{namee}</h5>
            <div className="single-bio mb-3">
              <div className="single-bio-text">
                <p className="w_25">
                  <b>
                    <u>Address</u>
                  </b>
                </p>
                <p className="w_75 pl-2">
                  {address}
                  <br />
                  {city}
                  <br />
                  {country}
                  <br />
                  {zip_code}
                </p>
                <p className="w_25">
                  <b>
                    <u>Phone</u>
                  </b>
                </p>
                <p className="w_75 pl-2">{phone}</p>
                <p className="w_25">
                  <b>
                    <u>Email</u>
                  </b>
                </p>
                <p className="w_75 pl-2">{email}</p>
              </div>
            </div>
            <div className="card-black mb-3 px-2 py-3">
              <h5 className="card-black card-header border-0 ">One day meal price</h5>
              <div className="px-4">
              
                {meal ? (
                  // Render form only when meal data is fetched
                  <form onSubmit={handleFormSubmit}>
                    <input
                    className="form-control border-0 col-12 mb-1 "
                      type="number"
                      id="mealPrice"
                      value={mealPrice}
                      onChange={(e) => setMealPrice(parseFloat(e.target.value))}
                    />
                    <button className="btn-meal" type="submit">Update</button>
                  </form>
                ) : (
                  <p>Loading meal data...</p>
                )}
                {error && <p>{error}</p>}
              
              {mealMessage && (
                <p style={{ color: "#ffffff" }}>{mealMessage}</p>
              )}
              </div>
            </div> 
            
          <h5 className="card-header border-bottom-0  border-grey border card-grey ">
              One Day Meal
            </h5>
            <div className="p-3 border border-grey">
            {mealDonation.length > 0 ? (
            mealDonation.map((donation) => (
              <div className="card" key={donation.id}>
                <h5 className="card-title">{donation.donator.namee}</h5>
                  <p className="card-text">Date: {donation.date_of_booking}</p>
                    <button onClick={() => handleJoinRoom(donation.donator.email)} className="btn-meal">Go Live</button>
                  
                </div>
                ))
                ) : (
                <p>No donations yet</p>
              )}
            </div>
            <h5 className="card-header border-bottom-0  border-grey border card-grey ">
              People Donated
            </h5>
            <div className="p-3 border border-grey">
              {donation.length > 0 ? (
                donation.map((obj) => {
                  return (
                    <div className="card p-0">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-12">
                            <p className="mb-0 mt-1">{obj.donator.namee}</p>
                            <p className="mb-0">{obj.needs.title}</p>
                            <p className="mb-0">{obj.donated}</p>
                          </div>
                        </div>
                      </div>
                      {/* <button
                        style={{ width: "100%" }}
                        className="btn border border-grey btn-custom p-1"
                      >
                        Thank you
                      </button> */}
                    </div>
                  );
                })
              ) : (
                <p>No donations yet</p>
              )}
            </div>
            </div>
          <div className="col-8">
            <div className="card need-form">
              {submitMessage && (
                <p style={{ color: "#fdbe33" }}>{submitMessage}</p>
              )}
              <form onSubmit={handleSubmit}>
                {/* The name input */}
                <div className="control-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => onChange(e)}
                    required="required"
                  />
                </div>
                {/* The email input */}
                <div className="control-group">
                  <input
                    type="text"
                    name="goal"
                    className="form-control"
                    value={goal}
                    onChange={(e) => onChange(e)}
                    placeholder="Goal"
                    required="required"
                  />
                </div>
                {/* The message input */}
                <div className="control-group">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e) => onChange(e)}
                    required="required"
                  ></textarea>
                </div>
                {/* The submit button */}
                <div>
                  <button className="btn btn-custom" type="submit">
                    Add needs
                  </button>
                </div>
              </form>
            </div>
            {/* Display orphanage meal info */}
            <h5 className="card-header mb-2">
              Needs
            </h5>
              {needs.length > 0 ? (
                needs.map((obj) => {
                return (
                  <div className="card causes mb-3">
                    <div className="causes-item">
                      <div className="causes-text mt-3">
                        <h3>
                          {obj.title}
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
                      {/* <div className="donate-btn">
                        <a className="btn btn-custom">Donate Now</a>
                      </div> */}
                    </div>
                  </div>
                ); })
                ) : (
                  <p>No needs yet</p>
                )}

          </div>
          {/* <div className="col-4">
         </div> */}
        </div>
      </div>
    </div>
  );
}

// Map state to props
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
  password: state.auth.password,
});

// Connect component to Redux store
export default connect(mapStateToProps)(OrphanageDashboard);
