import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";

const ConfirmBooking = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("id");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const confirm = async () => {
      try {
        await api.patch(`/bookings/${bookingId}/email-confirm`);
        setStatus("success");
      } catch (err) {
        setStatus("error")
      }
    };

    if (bookingId) {
      confirm();
    } else {
      setStatus("invalid");
    }
  }, [bookingId]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      {status === "loading" && <p>⏳ Confirming your booking...</p>}
      {status === "success" && <h2 className="text-green-600 text-2xl font-semibold">✅ Booking confirmed successfully!</h2>}
      {status === "error" && <h2 className="text-red-600 text-2xl font-semibold">❌ Booking already confirmed or failed.</h2>}
      {status === "invalid" && <h2 className="text-yellow-600 text-2xl font-semibold">⚠️ Invalid booking ID.</h2>}
    </div>
  );
};

export default ConfirmBooking;
