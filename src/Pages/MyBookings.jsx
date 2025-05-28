import React, { useEffect, useState } from "react";
import api from "../api/axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my-bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.patch(`/bookings/${id}/cancel`);
      setBookings(prev =>
        prev.map(b => b.id === id ? { ...b, status: "CANCELED" } : b)
      );
    } catch (err) {
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="py-14 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-xl text-gray-600">You don’t have any bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
          {bookings.map(booking => (
            <div
              key={booking.id}
              className="bg-white shadow-2xl rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={`http://localhost:8080/static/images/${booking.carImageUrl?.split("/").pop()}`}
                alt="Car"
                className="w-full h-72 object-cover"
                onError={(e) => {
                  e.target.src = "/images/cars-big/default-car.png";
                }}
              />
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {booking.carBrand} {booking.carModel}
                </h3>
                <p className="text-lg text-gray-700"><strong>📅 Dates:</strong> {booking.startDate} – {booking.endDate}</p>
                <p className="text-lg text-gray-700">
                  <strong>📌 Status:</strong>{" "}
                  <span className={
                    booking.status === "CONFIRMED" ? "text-green-600 font-bold" :
                    booking.status === "PENDING" ? "text-yellow-600 font-bold" :
                    "text-red-600 font-bold"
                  }>
                    {booking.status}
                  </span>
                </p>
                <p className="text-lg text-gray-700"><strong>💰 Price:</strong> {booking.totalPrice} som</p>
                <p className="text-lg text-gray-700">
                  <strong>🚗 Locations:</strong> {booking.pickUpLocation} → {booking.dropOffLocation}
                </p>

                {booking.status === "PENDING" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="w-full mt-4 py-3 text-lg bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold"
                  >
                    ❌ Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
