import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { Country, State, City } from "country-state-city";

const ListingForm = (props) => {
  const [orphanages, setOrphanages] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orphanage/`)
      .then((response) => {
        setOrphanages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  const detailOrphanage = (
    oname,
    oaddress,
    ocity,
    ocountry,
    ozip_code,
    oid,
    ophone,
    oemail
  ) => {
    navigate("/orphanage_details", {
      state: {
        name: oname,
        address: oaddress,
        city: ocity,
        country: ocountry,
        zip_code: ozip_code,
        id: oid,
        phone: ophone,
        email: oemail,
      },
    });
  };
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const countries = Country.getAllCountries();

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const states = State.getStatesOfCountry(selectedCountry);
  const cities = City.getCitiesOfState(selectedCountry, selectedState);

  const filteredContents = orphanages.filter(
    (content) =>
      content.city.toLowerCase().includes(selectedCity.toLowerCase()) &&
      content.state.toLowerCase().includes(selectedState.toLowerCase()) &&
      content.country.toLowerCase().includes(selectedCountry.toLowerCase())
  );
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-nowrap" style={{ minHeight: "100vh" }}>
        <div
          className="d-flex flex-column flex-shrink-0 p-3 "
          style={{ width: "280px", backgroundColor: "#ffffff" }}
        >
          <form className="listingform form-inline">
            <h2>Filter by</h2>
            <hr></hr>
            <div className="form-group col-12 marginud">
              {/* <label htmlFor="country">Country:</label> */}
              <select
                style={{ width: "100%" }}
                className="form-control"
                id="country"
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-12 marginud">
              {/* <label htmlFor="state">State:</label> */}
              <select
                style={{ width: "100%" }}
                className="form-control"
                id="state"
                name="state"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-12 marginud">
              {/* <label htmlFor="city">City:</label> */}
              <select
                style={{ width: "100%" }}
                className="form-control"
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        <div className="blog">
          <div className="container">
            <div className="row">
              {filteredContents.map((obj) => {
                if (obj.is_approve) {
                  return (
                    <div className="col-lg-6 ">
                      <div className="card">
                        {/* <img
                          src={`http://127.0.0.1:8000/${obj.pic}`}
                          alt="Image"
                        /> */}
                        <div className="blog-text">
                          <h3>
                            <a
                              href=""
                              onClick={() => {
                                detailOrphanage(
                                  obj.namee,
                                  obj.address,
                                  obj.city,
                                  obj.country,
                                  obj.zip_code,
                                  obj.id,
                                  obj.phone,
                                  obj.email
                                );
                              }}
                            >
                              {obj.namee}
                            </a>
                          </h3>
                        </div>
                        <div className="blog-meta">
                          <p className="w_25">
                            <a href="#">Address</a>
                          </p>
                          <p className="w_75">
                            {obj.address}
                            <br />
                            {obj.city}
                            <br />
                            {obj.country}
                            <br />
                            {obj.zip_code}
                          </p>
                        </div>
                        <div className="blog-meta">
                          <p className="w_25">
                            <a href="#">Phone </a>
                          </p>
                          <p className="w_75">{obj.phone}</p>
                        </div>
                        <div className="blog-meta">
                          <p className="w_25">
                            <a href="#">Email</a>
                          </p>
                          <p className="w_75">{obj.email}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ListingForm.propTypes = {
  setListings: PropTypes.func.isRequired,
};

export default ListingForm;
