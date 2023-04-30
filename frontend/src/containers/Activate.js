import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = ({ verify }) => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const verify_account = (e) => {
    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return navigate("/");
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Verify</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ marginBottom: "200px" }}
        >
          <h1>Verify your Account:</h1>
          <button
            onClick={verify_account}
            style={{ marginTop: "50px" }}
            type="button"
            className="btn loginbtn"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
