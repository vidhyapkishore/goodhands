import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    return navigate("/");
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Reset Password</h2>
            </div>
          </div>
        </div>
      </div>
      <div
        className="donate row justify-content-center"
        style={{ backgroundColor: "white" }}
      >
        <div className="donate-form col-6" style={{ margin: "20px" }}>
          <div className="about-tab">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <button className="btn btn-custom" type="submit">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
