import React, { useState } from "react"; //importing react and useState hook
import { Link, useNavigate } from "react-router-dom"; //importing Link component from react-router-dom
import donate from "../img/donate.jpg";
import { connect } from "react-redux"; //importing connect function from redux library
import { login } from "../actions/auth"; //importing login action from auth.js file

//Defining Login component with props passed as argument
const Login = ({
  login,
  isAuthenticated,
  user_login,
  namee,
  phone,
  user,
  iid,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [e, setE] = useState(""); //defining state variable e using useState hook
  const navigate = useNavigate(); //defining navigate object using useNavigate hook
  const { email, password } = formData;
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onChange = (e) => {
    //onChange event listener for form fields
    if (e.target.name === "email") {
      setE(e.target.value);
    } //if email field is changed, set value of e state to email field value
    setFormData({ ...formData, [e.target.name]: e.target.value }); //updating form data with new values
  };

  const onSubmit = (e) => {
    //onSubmit event listener for form submission
    e.preventDefault(); //prevent default behavior of form submission
    login(email, password); //call login function with email and password as parameters
  };

  console.log("loginpage"); //printing string 'loginpage' on console
  console.log(user_login, namee, phone, iid); //logging user_login, namee, phone and iid fetched from state

  //Redirecting user based on their type of login
  if (isAuthenticated) {
    if (user_login === "orphanage") {
      navigate("/dashboard"); //if user is orphanage type, redirect them to orphanage dashboard page
    } else if (user_login === "donator") {
      navigate("/user_dashboard"); //if user is donator type, redirect them to user dashboard page
    }
  }

  //Returning JSX that renders UI of Login component
  return (
    <div className="container">
      {/* Donate section with parallax image */}
      <div className="donate" data-parallax="scroll" data-image-src={donate}>
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="donate-content">
              {/* Section header with login text */}
              <div className="section-header">
                <h2>Login now</h2>
              </div>
              <div className="donate-text">
                <p>
                  Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi.
                  Curabitur facilisis ornare velit non. Aliquam metus tortor,
                  auctor id gravida, viverra quis sem. Curabitur non nisl nec
                  nisi maximus. Aenean convallis porttitor. Aliquam interdum at
                  lacus non blandit.
                </p>
              </div>
            </div>
          </div>
          {/* Login form */}
          <div className="col-lg-8">
            <div className="donate-form">
              <div className="about-tab">
                <form onSubmit={(e) => onSubmit(e)}>
                  {/* Email input */}
                  <div className="control-group">
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
                  {/* Password input */}
                  <div className="control-group">
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
                  {/* Login button */}
                  <div>
                    <button className="btn btn-custom" type="submit">
                      Login
                    </button>
                  </div>
                  {/* Signup */}
                  <p className="mt-3">
                    Don't have an account
                    <Link to="/signup" className="signupa">Sign up</Link>
                  </p>
                  {/* Forgot password */}
                  <p className="mt-3">
                    Forgot your password?
                    <Link to="/reset-password" className="signupa">Reset Password</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//Mapping states to props using mapStateToProps function
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  phone: state.auth.phone,
  namee: state.auth.namee,
  email: state.auth.email,
  user_login: state.auth.user_login,
  user: state.auth.user,
  iid: state.auth.id,
});

//Connecting Login component to Redux store and exporting it
export default connect(mapStateToProps, { login })(Login);
