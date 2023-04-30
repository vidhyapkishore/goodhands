import React from 'react'
import event_1 from "../img/event-1.jpg";
import event_2 from "../img/event-2.jpg";

const Events = () => {
  return (
    <div>
      <div className="page-header">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Upcoming Events</h2>
                    </div>
                    <div className="col-12">
                        <a href="#">Home</a>
                        <a href="#">Events</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="event">
            <div className="container">
                <div className="section-header text-center">
                    <p>Upcoming Events</p>
                    <h2>Be ready for our upcoming charity events</h2>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="event-item">
                            <img src={event_1} alt="Image"/>
                            <div className="event-content">
                                <div className="event-meta">
                                    <p><i className="fa fa-calendar-alt"></i>01-Jan-45</p>
                                    <p><i className="far fa-clock"></i>8:00 - 10:00</p>
                                    <p><i className="fa fa-map-marker-alt"></i>New York</p>
                                </div>
                                <div className="event-text">
                                    <h3>Lorem ipsum dolor sit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor
                                    </p>
                                    <a className="btn btn-custom" href="#">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="event-item">
                            <img src={event_2} alt="Image"/>
                            <div className="event-content">
                                <div className="event-meta">
                                    <p><i className="fa fa-calendar-alt"></i>01-Jan-45</p>
                                    <p><i className="far fa-clock"></i>8:00 - 10:00</p>
                                    <p><i className="fa fa-map-marker-alt"></i>New York</p>
                                </div>
                                <div className="event-text">
                                    <h3>Lorem ipsum dolor sit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor
                                    </p>
                                    <a className="btn btn-custom" href="#">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="event-item">
                            <img src={event_1} alt="Image"/>
                            <div className="event-content">
                                <div className="event-meta">
                                    <p><i className="fa fa-calendar-alt"></i>01-Jan-45</p>
                                    <p><i className="far fa-clock"></i>8:00 - 10:00</p>
                                    <p><i className="fa fa-map-marker-alt"></i>New York</p>
                                </div>
                                <div className="event-text">
                                    <h3>Lorem ipsum dolor sit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor
                                    </p>
                                    <a className="btn btn-custom" href="#">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="event-item">
                            <img src={event_2} alt="Image"/>
                            <div className="event-content">
                                <div className="event-meta">
                                    <p><i className="fa fa-calendar-alt"></i>01-Jan-45</p>
                                    <p><i className="far fa-clock"></i>8:00 - 10:00</p>
                                    <p><i className="fa fa-map-marker-alt"></i>New York</p>
                                </div>
                                <div className="event-text">
                                    <h3>Lorem ipsum dolor sit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor
                                    </p>
                                    <a className="btn btn-custom" href="#">Join Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Events
