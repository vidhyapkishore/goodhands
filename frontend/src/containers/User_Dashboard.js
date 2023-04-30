import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

function User_Dashboard({
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
  useEffect(() => {
    if (user_login !== "donator") {
      navigate("/");
    }
    refreshMessage();
    refreshDonations();
  }, []);

  const navigate = useNavigate();

  const { state } = useLocation();
  const [message, setMessage] = useState([]);  
  const [donation, setDonation] = useState([]);
  const [did, setDid] = useState("");
  
  const refreshMessage = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orphanage/${iid}/message/`)
      .then((res) => {
        setMessage(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const refreshDonations = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orphanage/${iid}/donations/`)
      .then((res) => {
        setDonation(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="single my-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 ">
            <h5 className="single-bioo border-bottom border p-2">{namee}</h5>
            <div className="single-bio ">
              <div className="single-bio-text text-wrap">
                <p className="text-wrap">
                  <b>
                    <u>Address</u>
                  </b>
                </p>
                <p className="pl-2 text-wrap">
                  {address}
                  <br />
                  {city}
                  <br />
                  {country}
                  <br />
                  {zip_code}
                </p>
                <p className="text-wrap">
                  <b>
                    <u>Phone</u>
                  </b>
                </p>
                <p className="pl-2 text-wrap">{phone}</p>
                <p className="text-wrap">
                  <b>
                    <u>Email</u>
                  </b>
                </p>
                <p className="pl-2 text-wrap">{email}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <h5 className="card-header text-center border-bottom-0  border-grey border card-grey ">
              Donations done by you
            </h5>
            <div className="p-3 border border-grey">
            {donation.length > 0 ? (
                donation.map((obj) => {
                  return (
                    <div className="card p-0">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-12">
                            <p className="mb-0 mt-1">{obj.needs.orphanage.namee}</p>
                            <p className="mb-0">{obj.needs.title}</p>
                            <p className="mb-0">{obj.donated}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No donations yet</p>
              )}
            </div>
          </div>
          {/* 
          <div className="col-lg-4">
            <h5 className="card mt-3 mb-2 border-bottom">
              Messages from orphanages
            </h5>
            <div className="card p-0">
              {message.length > 0 ? (
                message.map((obj) => {
                  return (
                    <div className="card  p-0">
                      <div className="container-fluid">
                        <div className="row pl-2">
                          <div className="col-12">
                            <p className="mb-0 mt-1">{obj.orphanage.namee}</p>
                            <p className="mb-0 fs-6 ml-2 orphanage_title ">
                              {" "}
                              Thank you for donating to our fund of "
                              {obj.donor.needs.title}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No messages yet</p>
              )}
            </div>
          </div> 
          */}
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
export default connect(mapStateToProps)(User_Dashboard);
