import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import React from 'react';

function Contact() {
  return (
    <>
      <section className="contact-page">
        <HeroPages name="Contact" />
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Need additional information?</h2>
              <p>
                A multifaceted professional skilled in multiple fields of
                research, development as well as a learning specialist.
              </p>
              <a href="/">
                <i className="fa-solid fa-phone"></i>&nbsp; + (996) 990-90-08-07
              </a>
              <a href="/">
                <i className="fa-solid fa-envelope"></i>&nbsp;
                aziret5265@gmail.com
              </a>
              <a href="/">
                <i className="fa-solid fa-location-dot"></i>&nbsp; Bishkek,
                Kyrgyzstan
              </a>
            </div>
            <div className="contact-div__form">
              <form>
                <label>
                  Full Name <b>*</b>
                </label>
                <input type="text" placeholder='E.g: "Joe Shmoe"'></input>

                <label>
                  Email <b>*</b>
                </label>
                <input type="email" placeholder="youremail@example.com"></input>

                <label>
                  Tell us about it <b>*</b>
                </label>
                <textarea placeholder="Write Here.."></textarea>

                <button type="submit">
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Send
                  Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>+ (996) 990-90-08-07</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Contact;
