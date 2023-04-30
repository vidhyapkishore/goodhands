import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

// Importing images
import aboutt from "../img/about.jpg";
import c_1 from "../img/carousel-1.jpg";
import c_2 from "../img/carousel-2.jpg";
import c_3 from "../img/carousel-3.jpg";
import event_1 from "../img/event-1.jpg";
import event_2 from "../img/event-2.jpg";
import facts from "../img/facts.jpg";
import volunteer from "../img/volunteer.jpg";

// Home component
const Home = () => {
  // State variables for the contact form
  const [namee, setName] = useState("");
  const [email, setEmail] = useState("@gmail.com");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [success, setSuccess] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const receiving_email = "techtalkque@gmail.com";
    const content_email =
      "Name:" + namee + "\n" + "Email:" + email + "\n" + "Message:" + message;
    const subject_line = "Contact Form:" + subject;
    const senders_email = email;

    // Sending a POST request to the API endpoint
    const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)[1];
    fetch(`${process.env.REACT_APP_API_URL}/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({
        content_email,
        receiving_email,
        subject_line,
        senders_email,
      }),
    })
      .then((response) => response.json())
      .then((data) => setSuccess(data.success))
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        {/* Carousel Slides */}
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img src={c_1} className="d-block w-100" alt="..." />
            {/* Text Overlay */}
            <div class="carousel-text">
              <h1>Let's be kind for children</h1>
              <p>
                Lorem ipsum dolor sit amet elit. Phasellus ut mollis mauris.
                Vivamus egestas eleifend dui ac consequat at lectus in malesuada
              </p>
              {/* Buttons */}
              <div class="carousel-btn">
                <a class="btn btn-custom" href="orphanages">
                  Donate Now
                </a>
                {/* Video Modal Button */}
                {/* <a class="btn btn-custom btn-play" data-toggle="modal" data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-target="#videoModal">Watch Video</a> */}
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="carousel-item">
            <img src={c_2} className="d-block w-100" alt="..." />
            {/* Text Overlay */}
            <div class="carousel-text">
              <h1>Get Involved with helping hand</h1>
              <p>
                Morbi sagittis turpis id suscipit feugiat. Suspendisse eu augue
                urna. Morbi sagittis, orci sodales varius fermentum, tortor
              </p>
              {/* Buttons */}
              <div class="carousel-btn">
                <a class="btn btn-custom" href="orphanages">
                  Donate Now
                </a>
                {/* Video Modal Button */}
                {/* <a class="btn btn-custom btn-play" data-toggle="modal" data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-target="#videoModal">Watch Video</a> */}
              </div>
            </div>
          </div>
          {/* Slide 3 */}
          <div className="carousel-item">
            <img src={c_3} className="d-block w-100" alt="..." />
            {/* Text Overlay */}
            <div class="carousel-text">
              <h1>Bringing smiles to millions</h1>
              <p>
                Sed ultrices, est eget feugiat accumsan, dui nibh egestas
                tortor, ut rhoncus nibh ligula euismod quam. Proin pellentesque
                odio
              </p>
              {/* Buttons */}
              <div class="carousel-btn">
                <a class="btn btn-custom" href="orphanages">
                  Donate Now
                </a>
                {/* Video Modal Button */}
                {/* <a class="btn btn-custom btn-play" data-toggle="modal" data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-target="#videoModal">Watch Video</a> */}
              </div>
            </div>
          </div>
        </div>

        <div className="control_carousel">
          <a
            className="carousel-control-prev "
            href="#carouselExampleFade"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleFade"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      {/* // Video modal  */}
      <div
        className="modal fade"
        id="videoModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src=""
                  id="video"
                  allowscriptaccess="always"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // About section */}
      <div id="about" className="about">
        <div className="container">
          <div className="row align-items-center">
            {/* // About image */}
            <div className="col-lg-6">
              <div
                className="about-img"
                data-parallax="scroll"
                data-image-src={aboutt}
              ></div>
            </div>
            {/* // About text */}
            <div className="col-lg-6">
              <div className="section-header">
                <p>Learn About Us</p>
                <h2>Worldwide non-profit charity organization</h2>
              </div>
              {/* // About tabs */}
              <div className="about-tab">
                <ul className="nav nav-pills nav-justified">
                  {/* // About tab 1 */}
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#tab-content-1"
                    >
                      About
                    </a>
                  </li>
                  {/* // About tab 2 */}
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
                {/* // About tab content */}
                <div className="tab-content">
                  {/* // About tab 1 content */}
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
                  {/* // About tab 2 content */}
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
                  {/* // About tab 3 content */}
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
      <div className="service">
        {/* Container for the section */}
        <div className="container">
          {/* Section header */}
          <div className="section-header text-center">
            <p>What We Do?</p>
            <h2>We believe that we can save more lifes with you</h2>
          </div>
          {/* Services row */}
          <div className="row">
            {/* Service item: Healthy Food */}
            <div className="col-lg-4 col-md-6">
              <div className="service-item">
                <div className="service-icon">
                  <i className="flaticon-diet"></i>
                </div>
                <div className="service-text">
                  <h3>Healthy Food</h3>
                  <p>
                    Lorem ipsum dolor sit amet elit. Phase nec preti facils
                    ornare velit non metus tortor
                  </p>
                </div>
              </div>
            </div>

            {/* Service item: Pure Water */}
            <div className="col-lg-4 col-md-6">
              <div className="service-item">
                <div className="service-icon">
                  <i className="flaticon-water"></i>
                </div>
                <div className="service-text">
                  <h3>Pure Water</h3>
                  <p>
                    Lorem ipsum dolor sit amet elit. Phase nec preti facils
                    ornare velit non metus tortor
                  </p>
                </div>
              </div>
            </div>

            {/* Service item: Health Care */}
            <div className="col-lg-4 col-md-6">
              <div className="service-item">
                <div className="service-icon">
                  <i className="flaticon-healthcare"></i>
                </div>
                <div className="service-text">
                  <h3>Health Care</h3>
                  <p>
                    Lorem ipsum dolor sit amet elit. Phase nec preti facils
                    ornare velit non metus tortor
                  </p>
                </div>
              </div>
            </div>

            {/* Service item: Primary Education */}
            <div className="col-lg-4 col-md-6">
              <div className="service-item">
                <div className="service-icon">
                  <i className="flaticon-education"></i>
                </div>
                <div className="service-text">
                  <h3>Primary Education</h3>
                  <p>
                    Lorem ipsum dolor sit amet elit. Phase nec preti facils
                    ornare velit non metus tortor
                  </p>
                </div>
              </div>
            </div>

            {/* Service item: Residence Facilities */}
            <div className="col-lg-4 col-md-6">
              <div className="service-item">
                <div className="service-icon">
                  <i className="flaticon-home"></i>
                </div>
                <div className="service-text">
                  <h3>Residence Facilities</h3>
                  <p>
                    Lorem ipsum dolor sit amet elit. Phase nec preti facils
                    ornare velit non metus tortor
                  </p>
                </div>
              </div>
            </div>

            {/* Service item: Social Care */}
            <div className="col-lg-4 col-md-6">
              <div className="service-item">
                <div className="service-icon">
                  <i className="flaticon-social-care"></i>
                </div>
                <div className="service-text">
                  <h3>Social Care</h3>
                  <p>
                    Lorem ipsum dolor sit amet elit. Phase nec preti facils
                    ornare velit non metus tortor
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* End of services row */}
        </div>{" "}
        {/* End of container for the section */}
      </div>{" "}
      {/* End of service section */}
      <div className="facts" data-parallax="scroll" data-image-src={facts}>
        {/* The div below contains the content of the facts section */}
        <div className="container">
          {/* The div below is a row */}
          <div className="row">
            {/* Each column represents a fact */}
            <div className="col-lg-3 col-md-6">
              <div className="facts-item">
                <i className="flaticon-home"></i>
                {/* The div below contains the number and description of the fact */}
                <div className="facts-text">
                  {/* The h3 element below is where the number is displayed */}
                  <h3 className="facts-plus" data-toggle="counter-up">
                    150
                  </h3>
                  {/* The p element below displays what the fact represents */}
                  <p>Countries</p>
                </div>
              </div>
            </div>
            {/* Repeat the same structure for each fact */}
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


      <div id="events" className="event">
        {/* This div contains the content of the events section */}
        <div className="container">
          {/* The section header introduces the events section */}
          <div className="section-header text-center">
            <p>Upcoming Events</p>
            <h2>Be ready for our upcoming charity events</h2>
          </div>
          {/* The row below contains the event items */}
          <div className="row">
            {/* Each column represents an event */}
            <div className="col-lg-6">
              <div className="event-item">
                {/* The image displayed for the event */}
                <img src={event_1} alt="Image" />
                <div className="event-content">
                  {/* The event meta displays information about the event, such as date, time, and location */}
                  <div className="event-meta">
                    <p>
                      <i className="fa fa-calendar-alt"></i>01-Jan-45
                    </p>
                    <p>
                      <i className="far fa-clock"></i>8:00 - 10:00
                    </p>
                    <p>
                      <i className="fa fa-map-marker-alt"></i>New York
                    </p>
                  </div>
                  {/* The event text contains the title, description, and join button */}
                  <div className="event-text">
                    <h3>Lorem ipsum dolor sit</h3>
                    <p>
                      Lorem ipsum dolor sit amet elit. Neca pretim miura bitur
                      facili ornare velit non vulpte liqum metus tortor
                    </p>
                    <a className="btn btn-custom" href="#">
                      Join Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Repeat the same structure for each event */}
            <div className="col-lg-6">
              <div className="event-item">
                <img src={event_2} alt="Image" />
                <div className="event-content">
                  <div className="event-meta">
                    <p>
                      <i className="fa fa-calendar-alt"></i>01-Jan-45
                    </p>
                    <p>
                      <i className="far fa-clock"></i>8:00 - 10:00
                    </p>
                    <p>
                      <i className="fa fa-map-marker-alt"></i>New York
                    </p>
                  </div>
                  <div className="event-text">
                    <h3>Lorem ipsum dolor sit</h3>
                    <p>
                      Lorem ipsum dolor sit amet elit. Neca pretim miura bitur
                      facili ornare velit non vulpte liqum metus tortor
                    </p>
                    <a className="btn btn-custom" href="#">
                      Join Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      


      <div
        id="contact"
        className="volunteer"
        data-parallax="scroll"
        data-image-src={volunteer}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* The left column contains the contact form */}
            <div className="col-lg-5">
              <div className="volunteer-form">
                {/* If the form was submitted successfully, display a success message */}
                {success ? (
                  <p>Thank you for contacting us! We will get back to you soon.</p>
                ) : (
                  // Otherwise, display the contact form
                  <form onSubmit={handleSubmit}>
                    {/* The name input */}
                    <div className="control-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={namee}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required="required"
                      />
                    </div>
                    {/* The email input */}
                    <div className="control-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required="required"
                      />
                    </div>
                    {/* The subject input */}
                    <div className="control-group">
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required="required"
                        data-validation-required-message="Please enter a subject"
                      />
                    </div>
                    {/* The message input */}
                    <div className="control-group">
                      <textarea
                        className="form-control"
                        placeholder="Message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required="required"
                      ></textarea>
                    </div>
                    {/* The submit button */}
                    <div>
                      <button className="btn btn-custom" type="submit">
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            {/* The right column contains the contact information */}
            <div className="col-lg-7">
              <div className="volunteer-content">
                {/* The section header */}
                <div className="section-header">
                  <p>Get in touch</p>
                  <h2>Contact for any query</h2>
                </div>
                {/* The description */}
                <div className="volunteer-text">
                  <p>
                    Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi.
                    Curabitur facilisis ornare velit non. Aliquam metus tortor,
                    auctor id gravida, viverra quis sem. Curabitur non nisl nec nisi
                    maximus. Aenean convallis porttitor. Aliquam interdum at lacus
                    non blandit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* // This section displays causes that users can donate to */}
      <div className="causes">
        <div className="container">
          <div className="row text-center">
            {/* // The left column takes up more space and highlights the header */}
            <div className="col-8 ">
              <div className="section-header">
                <h2>Be part of something good</h2>
              </div>
            </div>
            {/* // The right column is smaller and contains a donate button */}
            <div className="col-4">
              <a class="btn btn-custom" href="/orphanages">
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>
      
    
    </div>
  );
};

export default Home;
