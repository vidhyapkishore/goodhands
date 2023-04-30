import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import volunteer from "../img/profile.jpg";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import donate from "../img/donate.jpg";

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namee: "",
    email: "",
    password: "",
    re_password: "",
    phone: "",
    user_login: "",
  });

  useEffect(() => {
    console.log(formData);
  }, []);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const countries = Country.getAllCountries();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRepasswordVisibility = () => {
    setShowRepassword(!showRepassword);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState("");
    setSelectedCity("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const states = State.getStatesOfCountry(selectedCountry);
  const cities = City.getCitiesOfState(selectedCountry, selectedState);

  const {
    namee,
    user_login,
    phone,
    email,
    password,
    re_password,
    address,
    zip_code,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup(
        namee,
        user_login,
        phone,
        email,
        password,
        re_password,
        address,
        zip_code,
        selectedCity,
        selectedCountry,
        selectedState
      );
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return navigate("/");
  }
  if (accountCreated) {
    return navigate("/login");
  }

  return (
    <div>
      <div className="container">
        <div className="donate" data-parallax="scroll" data-image-src={donate}>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="donate-content">
                <div className="section-header">
                  <h2>Register now</h2>
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
            <div className="col-lg-8">
              <div className="donate-form">
                <div className="about-tab">
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Name*"
                          name="namee"
                          value={namee}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          className="form-control"
                          type="tel"
                          placeholder="Whatsapp Number*"
                          name="phone"
                          value={phone}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <select
                          class="form-select p-2 form-control"
                          aria-label="Default select example"
                          name="user_login"
                          onChange={(e) => onChange(e)}
                          required
                        >
                          <option className="userselection" value="donator">
                            REGISTER AS
                          </option>
                          <option className="userselection" value="orphanage">
                            Orphanage
                          </option>
                          <option className="userselection" value="donator">
                            Donator
                          </option>
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email*"
                          name="email"
                          value={email}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      {/* Password input */}
                      <div className="control-group col-6">
                        <div className="input-group">
                          {" "}
                          {/* Add an input-group wrapper for relative positioning */}
                          <input
                            className="form-control"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                            required
                          />
                          {/* Eye icon for password visibility */}
                          <span
                            className="input-group-addon password-toggle-icon"
                            onClick={togglePasswordVisibility} // Call the togglePasswordVisibility function on click
                          >
                            {/* Use a conditional rendering to display eye icon based on showPassword state */}
                            {showPassword ? (
                              <i className="fas fa-eye-slash"></i>
                            ) : (
                              <i className="fas fa-eye"></i>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="control-group col-6">
                        <div className="input-group">
                          {" "}
                          {/* Add an input-group wrapper for relative positioning */}
                          <input
                            className="form-control"
                            type={showRepassword ? "text" : "password"}
                            placeholder="Confirm Password*"
                            name="re_password"
                            value={re_password}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                            required
                          />
                          {/* Eye icon for password visibility */}
                          <span
                            className="input-group-addon password-toggle-icon"
                            onClick={toggleRepasswordVisibility} // Call the toggleRepasswordVisibility function on click
                          >
                            {/* Use a conditional rendering to display eye icon based on showRepassword state */}
                            {showRepassword ? (
                              <i className="fas fa-eye-slash"></i>
                            ) : (
                              <i className="fas fa-eye"></i>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Address*"
                          name="address"
                          value={address}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Zip code*"
                          name="zip_code"
                          value={zip_code}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <select
                          style={{ width: "100%" }}
                          className="form-control"
                          id="country"
                          name="country"
                          value={selectedCountry}
                          onChange={handleCountryChange}
                        >
                          <option style={{ color: "black" }} value="">
                            Select Country
                          </option>
                          {countries.map((country) => (
                            <option
                              style={{ color: "black" }}
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <select
                          style={{ width: "100%" }}
                          className="form-control"
                          id="state"
                          name="state"
                          value={selectedState}
                          onChange={handleStateChange}
                        >
                          <option style={{ color: "black" }} value="">
                            Select state
                          </option>
                          {states.map((state) => (
                            <option
                              style={{ color: "black" }}
                              key={state.isoCode}
                              value={state.isoCode}
                            >
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <select
                          style={{ width: "100%" }}
                          className="form-control"
                          name="city"
                          id="city"
                          value={selectedCity}
                          onChange={handleCityChange}
                        >
                          <option style={{ color: "black" }} value="">
                            Select City
                          </option>
                          {cities.map((city) => (
                            <option
                              style={{ color: "black" }}
                              key={city.name}
                              value={city.name}
                            >
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <button className="btn btn-custom" type="submit">
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="mt-3">
                    Already have an account? <Link className="signupa" to="/login">Sign In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
