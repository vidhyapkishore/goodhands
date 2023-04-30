import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ logout, isAuthenticated ,user_login,email,namee}) => {
  const [redirecct, setRedirecct] = useState(false);
  const [dashboardUrl,setDashboardUrl] = useState(false);
  console.log(user_login)

  const navigate = useNavigate();
  const logout_user = () => {
    logout();
    setRedirecct(true);
  };
  if (user_login === 'orphanage'){
    console.log(user_login)
  //  setDashboardUrl(true);
  }
  const guestLinks = () => (
    <Fragment>
      <a className="yellowHover nav-item px-0 py-2" href="/login">Login</a>
      <p className="yellowHover nav-item px-0 py-2" href="/login">/</p>      
      <a className="yellowHover nav-item px-0 py-2 " href="/signup">Signup</a>
      {/* <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
      </li> */}
    </Fragment>
  );
  const authLinks = () => (
    <div className="dropdown">
    <a className="nav-item nav-link dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i className="fa fa-solid fa-user mr-1" style={{color:"#fdbe32"}}></i>  
      {namee}
    </a>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
      {/* Dropdown menu items */}
      {user_login === 'donator' && (
        <a className="dropdown-item" href="/user_dashboard">
          Dashboard
        </a>
      )}
      {user_login === 'orphanage' && (
        <a className="dropdown-item" href="/dashboard">
          Dashboard
        </a>
      )}
      
      <a className="dropdown-item" href="#">Edit Profile</a>
      <a className="dropdown-item " href="#!" onClick={logout_user}> Logout</a>
    </div>
  </div>
    
    // <a className="loginbtn" href="#!" onClick={logout_user}>Logout</a> 
    
    
    // <li className="nav-item">
    //   <a className="nav-link" href="#!" onClick={logout_user}>
    //     Logout
    //   </a>
    // </li>
  );

  return (
    <Fragment>
      <div className="top-bar d-none d-md-block">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <div className="top-bar-left">
                            <div className="text">
                                <i className="fa fa-phone-alt"></i>
                                <p>+123 456 7890</p>
                            </div>
                            <div className="text">
                                <i className="fa fa-envelope"></i>
                                <p>info@example.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="top-bar-right">
                            <div className="social">
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <a href="index.html" className="navbar-brand">GoodHands</a>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <div className="navbar-nav ml-auto">
                    <a href="/" className="nav-item nav-link active">Home</a>
                        <a href="./#about" className="nav-item nav-link">About</a>
                        <a href="/orphanages" className="nav-item nav-link">Orphanages</a>
                        <a href="./#events" className="nav-item nav-link">Events</a>
                        <a href="./#contact" className="nav-item nav-link">Contact</a>
                        <a href="./#" className="nav-item nav-link"></a>
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </div>
                </div>
            </div>
        </div>
      {redirecct ? navigate("/") : <Fragment></Fragment>}
    </Fragment>
  );
};

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

export default connect(mapStateToProps, { logout })(Navbar);
