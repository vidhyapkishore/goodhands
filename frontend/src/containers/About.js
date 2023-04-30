import React from "react";
import aboutt from "../img/about.jpg";
import facts from "../img/facts.jpg";
import team_1 from "../img/team-1.jpg";
import team_2 from "../img/team-2.jpg";
import team_3 from "../img/team-3.jpg";
import team_4 from "../img/team-4.jpg";

const About = () => {
  // This is the main component for the About page.

  return (
    <div>
      <div className="page-header">
        {/* This div contains the page header, which includes a title and navigation links */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>About Us</h2>
            </div>
            <div className="col-12">
              <a href="#">Home</a>
              <a href="#">About Us</a>
            </div>
          </div>
        </div>
      </div>

      <div className="about">
        {/* This div contains the main content for the About page */}
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="about-img"
                data-parallax="scroll"
                data-image-src={aboutt}
              ></div>
            </div>
            <div className="col-lg-6">
              <div className="section-header">
                <p>Learn About Us</p>
                <h2>Worldwide non-profit charity organization</h2>
              </div>
              <div className="about-tab">
                {/* This div contains tab navigation for different sections */}
                <ul className="nav nav-pills nav-justified">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#tab-content-1"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="pill"
                      href="#tab-content-2"
                    >
                      Mission
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="pill"
                      href="#tab-content-3"
                    >
                      Vision
                    </a>
                  </li>
                </ul>
                {/* This div contains the content for different tab sections */}
                <div className="tab-content">
                  <div id="tab-content-1" className="container tab-pane active">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    vitae pellentesque turpis. Donec in hendrerit dui, vel
                    blandit massa. Ut vestibulum suscipit cursus. Cras quis
                    porta nulla, ut placerat risus. Aliquam nec magna eget velit
                    luctus dictum. Phasellus et felis sed purus tristique
                    dignissim. Morbi sit amet leo at purus accumsan
                    pellentesque. Vivamus fermentum nisi vel dapibus blandit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <div id="tab-content-2" className="container tab-pane fade">
                    Sed tincidunt, magna ut vehicula volutpat, turpis diam
                    condimentum justo, posuere congue turpis massa in mi. Proin
                    ornare at massa at fermentum. Nunc aliquet sed nisi iaculis
                    ornare. Nam semper tortor eget est egestas, eu sagittis nunc
                    sodales. Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Praesent bibendum sapien sed purus molestie
                    malesuada. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </div>
                  <div id="tab-content-3" className="container tab-pane fade">
                    Aliquam dolor odio, mollis sed feugiat sit amet, feugiat ut
                    sapien. Nunc eu dignissim lorem. Suspendisse at hendrerit
                    enim. Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Sed condimentum semper turpis vel facilisis. Nunc
                    vel faucibus orci. Mauris ut mauris rhoncus, efficitur nisi
                    at, venenatis quam. Praesent egestas pretium enim sit amet
                    finibus. Curabitur at erat molestie, tincidunt lorem eget,
                    consequat ligula.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="facts" data-parallax="scroll" data-image-src={facts}>
        <div className="container">
          <div className="row">
            {/* First fact */}
            <div className="col-lg-3 col-md-6">
              <div className="facts-item">
                <i className="flaticon-home"></i>
                <div className="facts-text">
                  <h3 className="facts-plus" data-toggle="counter-up">
                    150
                  </h3>
                  <p>Countries</p>
                </div>
              </div>
            </div>
            {/* Second fact */}
            <div className="col-lg-3 col-md-6">
              <div className="facts-item">
                <i className="flaticon-charity"></i>
                <div className="facts-text">
                  <h3 className="facts-plus" data-toggle="counter-up">
                    400
                  </h3>
                  <p>Volunteers</p>
                </div>
              </div>
            </div>
            {/* Third fact */}
            <div className="col-lg-3 col-md-6">
              <div className="facts-item">
                <i className="flaticon-kindness"></i>
                <div className="facts-text">
                  <h3 className="facts-dollar" data-toggle="counter-up">
                    10000
                  </h3>
                  <p>Our Goal</p>
                </div>
              </div>
            </div>
            {/* Fourth fact */}
            <div className="col-lg-3 col-md-6">
              <div className="facts-item">
                <i className="flaticon-donation"></i>
                <div className="facts-text">
                  <h3 className="facts-dollar" data-toggle="counter-up">
                    5000
                  </h3>
                  <p>Raised</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team">
        <div className="container">
          <div className="section-header text-center">
            <p>Meet Our Team</p>
            <h2>Awesome guys behind our charity activities</h2>
          </div>
          <div className="row">
            {/* First team member */}
            <div className="col-lg-3 col-md-6">
              <div className="team-item">
                <div className="team-img">
                  <img src={team_1} alt="Team Image" />
                </div>
                <div className="team-text">
                  <h2>Donald John</h2>
                  <p>Founder &amp; CEO</p>
                  <div className="team-social">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Second team member */}
            <div className="col-lg-3 col-md-6">
              <div className="team-item">
                <div className="team-img">
                  <img src={team_2} alt="Team Image" />
                </div>
                <div className="team-text">
                  <h2>Adam Phillips</h2>
                  <p>Chef Executive</p>
                  <div className="team-social">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Third team member */}
            <div className="col-lg-3 col-md-6">
              <div className="team-item">
                <div className="team-img">
                  <img src={team_3} alt="Team Image" />
                </div>
                <div className="team-text">
                  <h2>Thomas Olsen</h2>
                  <p>Chef Advisor</p>
                  <div className="team-social">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Fourth team member*/}
            <div className="col-lg-3 col-md-6">
              <div className="team-item">
                <div className="team-img">
                  <img src={team_4} alt="Team Image" />
                </div>
                <div className="team-text">
                  <h2>James Alien</h2>
                  <p>Advisor</p>
                  <div className="team-social">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
