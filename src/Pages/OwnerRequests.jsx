import React, { useEffect, useState } from "react";
import api from "../api/axios";

const OwnerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/bookings/owner-requests");
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to load requests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await api.patch(`/bookings/${id}/confirm`);
      setRequests(prev => prev.filter(r => r.id !== id));
      setActionMessage("✅ Booking confirmed.");
    } catch (err) {
      setActionMessage("❌ Failed to confirm booking.");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.patch(`/bookings/${id}/reject`);
      setRequests(prev => prev.filter(r => r.id !== id));
      setActionMessage("❌ Booking rejected.");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setActionMessage("⚠️ Failed to reject booking.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Incoming Booking Requests</h2>

      {actionMessage && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">{actionMessage}</div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No new requests available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {requests.map(req => (
            <div key={req.id} className="p-4 border rounded shadow bg-white">
              <img
                src={`http://localhost:8080/static/images/${req.carImageUrl?.split('/').pop()}`}
                alt="Car"
                className="w-full h-48 object-cover mb-3 rounded"
                onError={(e) => {
                  e.target.src = "/images/cars-big/default-car.png";
                }}
              />
              <p><strong>Car:</strong> {req.carBrand} {req.carModel}</p>
              <p><strong>Dates:</strong> {req.startDate} – {req.endDate}</p>
              <p><strong>Email:</strong> {req.customerEmail}</p>
              <p><strong>Status:</strong> <span className="text-yellow-600">{req.status}</span></p>

              <div className="mt-3 flex gap-4">
                <button
                  onClick={() => handleConfirm(req.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  ✅ Confirm
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerRequests;
