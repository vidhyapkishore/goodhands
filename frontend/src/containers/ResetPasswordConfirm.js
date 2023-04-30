import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    reset_password_confirm(uid, token, new_password, re_new_password);
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
              <h2>Reset Password Confirm</h2>
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
                  type="password"
                  placeholder="New Password"
                  name="new_password"
                  value={new_password}
                  onChange={(e) => onChange(e)}
                  minLength="6"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Confirm New Password"
                  name="re_new_password"
                  value={re_new_password}
                  onChange={(e) => onChange(e)}
                  minLength="6"
                  required
                />
              </div>
              <button className="btn btn-custom" type="submit">
                Reset Password
              </button>
            </form>
            <p className="mt-3">
              {/* Already have an account? <Link to="/login">Sign In</Link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
