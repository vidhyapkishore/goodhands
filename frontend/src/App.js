// Importing necessary modules and components
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Activate from "./containers/Activate";
import Login from "./containers/Login";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Layout from "./hocs/Layout";
import User_Dashboard from "./containers/User_Dashboard";
import OrphanageDashboard from "./containers/OrphanageDashboard";
import Orphanages from "./containers/Orphanages";
import Signup from "./containers/Signup";
import { Provider } from "react-redux";
import store from "./store";
import About from "./containers/About";
import Orphanages_Details from "./containers/Orphanages_Details";
import "./App.css";
import Video from "./containers/Video";
import Room from "./containers/Room";
import OneDayMealBooking from "./containers/OneDayMealBooking";
import DonationForm from "./containers/DonationForm"
import DashboardPage from "./dashboard/UserDashboardPage";

// Defining App component using arrow function
const App = () => {
  // returning the JSX 
  return (
    <div>
      <Provider store={store}> {/* Wrapping the entire application with Redux Provider component*/}
        <BrowserRouter> {/* Wrapping the Router components for client-side routing*/}
          <Layout> {/* A higher-order component that renders common functionality across multiple pages */}
            <Routes> {/* Component that acts as a parent element for all Route components*/}
              {/* Defining different routes and their associated components to be rendered*/}
              <Route exact path="/onedaymeal" element={<OneDayMealBooking/>} />
              <Route exact path="/donationform" element={<DonationForm/>}/>
              <Route exact path="/dashboard" element={<DashboardPage/>}/>
              <Route exact path="/" element={<Home />} /> {/* Specifies the Home component to be rendered when "/" route is accessed*/}
              <Route exact path="/login" element={<Login />} /> {/* Specifies the Login component to be rendered when "/login" route is accessed*/}
              <Route exact path="/signup" element={<Signup />} /> {/* Specifies the Signup component to be rendered when "/signup" route is accessed*/}
              <Route exact path="/about" element={<About />} /> {/* Specifies the About component to be rendered when "/about" route is accessed*/}
              <Route exact path="/video_live" element={<Video />} /> {/* Specifies the Video component to be rendered when "/video_live" route is accessed*/}
              <Route exact path="/room/:roomID" element={<Room/>}/> {/* Specifies the Room component to be rendered and passes props to it when "/room/:roomID" route is accessed*/}
              <Route exact path="/reset-password" element={<ResetPassword />} /> {/* Specifies the ResetPassword component to be rendered when "/reset-password" route is accessed*/}
              <Route exact path="/orphanages" element={<Orphanages/>}/> {/* Specifies the Orphanages component to be rendered when "/orphanages" route is accessed */}
              <Route path="orphanage_details" element={<Orphanages_Details />}/> {/* Specifies the Orphanages_Details component to be rendered when "orphanage_details" route is accessed*/}
              <Route
                exact
                path="/password/reset/confirm/:uid/:token"
                element={<ResetPasswordConfirm />}
              /> {/* Specifies the ResetPasswordConfirm component to be rendered and passes props to it when "/password/reset/confirm/:uid/:token" route is accessed*/}
              <Route
                exact
                path="/activate/:uid/:token"
                element={<Activate />}
              /> {/* Specifies the Activate component to be rendered and passes props to it when "/activate/:uid/:token" route is accessed*/}
              <Route
                path="orphanage_dashboard"
                element={<OrphanageDashboard />}
              /> {/* Specifies the OrphanageDashboard component to be rendered when "orphanage_dashboard" route is accessed*/}
              <Route
                path="user_dashboard"
                element={<User_Dashboard />}
              /> {/* Specifies the User_Dashboard component to be rendered when "user_dashboard" route is accessed*/}
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

// Exporting the App component to be used in other modules
export default App;
