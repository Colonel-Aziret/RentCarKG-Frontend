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
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "CANCELED" } : b));
        } catch (err) {
            alert("Failed to cancel booking");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

            {bookings.length === 0 ? (
                <p>You don’t have any bookings yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                    {bookings.map(booking => (
                        <div key={booking.id} className="p-4 border rounded shadow bg-white">
                            {booking.carImageUrl && (
                                <img
                                    src={`http://localhost:8080/static/images/${booking.carImageUrl.split('/').pop()}`}
                                    alt="Car"
                                    className="w-full h-64 object-cover rounded mb-3"
                                    onError={(e) => {
                                        e.target.src = "/images/cars-big/default-car.png";
                                    }}
                                />
                            )}

                            <p><strong>Car:</strong> {booking.carBrand} {booking.carModel}</p>
                            <p><strong>Dates:</strong> {booking.startDate} – {booking.endDate}</p>
                            <p><strong>Status:</strong> <span className="font-semibold">{booking.status}</span></p>
                            <p><strong>Price:</strong> {booking.totalPrice} som</p>
                            <p><strong>Locations:</strong> {booking.pickUpLocation} → {booking.dropOffLocation}</p>

                            {booking.status === "PENDING" && (
                                <button
                                    onClick={() => handleCancel(booking.id)}
                                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    ❌ Cancel Booking
                                </button>
                            )}
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};

export default MyBookings;
