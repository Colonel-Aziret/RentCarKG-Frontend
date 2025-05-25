import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Models() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/cars")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Ошибка бронирования. Проверьте данные.");
      });
  }, []);

  return (
    <>
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        <div className="container">
          {loading ? (
            <p>Загрузка автомобилей...</p>
          ) : (
            <div className="models-div">
              {cars.map((car) => (
                <div className="models-div__box" key={car.id}>
                  <div className="models-div__box__img">
                    <img
                      src={`http://localhost:8080/static/images/${car.imageUrl.split('/').pop()}`}
                      alt={car.name}
                      onError={(e) => {
                        e.target.src = "/images/cars-big/default-car.png";
                      }}
                    />
                    <div className="models-div__box__descr">
                      <div className="models-div__box__descr__name-price">
                        <div className="models-div__box__descr__name-price__name">
                          <p style={{ fontWeight: "600" }}>{car.title}</p>
                          <span>
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className="fa-solid fa-star"></i>
                            ))}
                          </span>
                        </div>
                        <div className="models-div__box__descr__name-price__price">
                          <h4>{car.pricePerDay} som</h4>
                          <p>per day</p>
                        </div>
                      </div>
                      <div className="models-div__box__descr__name-price__details" style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: "8px 16px",
                        alignItems: "center",
                        width: "100%"
                      }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <i className="fa-solid fa-users" style={{ marginRight: "8px", width: "16px", textAlign: "center" }}></i>
                          <span>Capacity</span>
                        </div>
                        <span style={{
                          textAlign: "right",
                          paddingRight: "12px",
                          minWidth: "60px"
                        }}>{car.capacity || "5"}</span>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <i className="fa-solid fa-gears" style={{ marginRight: "8px", width: "16px", textAlign: "center" }}></i>
                          <span>Transmission</span>
                        </div>
                        <span style={{
                          textAlign: "right",
                          paddingRight: "12px",
                          minWidth: "60px"
                        }}>{car.transmission || "Automatic"}</span>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <i className="fa-solid fa-gas-pump" style={{ marginRight: "8px", width: "16px", textAlign: "center" }}></i>
                          <span>Fuel</span>
                        </div>
                        <span style={{
                          textAlign: "right",
                          paddingRight: "12px",
                          minWidth: "60px"
                        }}>{car.fuelType || "Petrol"}</span>
                      </div>
                      <div className="models-div__box__descr__name-price__btn">
                        <Link onClick={() => window.scrollTo(0, 0)} to="/">
                          Book Ride
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>+ (996) 990-900-807</h3>
              </span>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}

export default Models;
