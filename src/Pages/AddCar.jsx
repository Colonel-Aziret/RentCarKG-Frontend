import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddCar = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    capacity: "",
    fuelType: "",
    transmission: "",
    pricePerDay: "",
    description: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ownerEmail = localStorage.getItem("email"); // или получить из контекста, если доступно
    const formData = new FormData();
    formData.append("car", new Blob([JSON.stringify(car)], { type: "application/json" }));
    formData.append("image", image);
    formData.append("ownerEmail", ownerEmail);

    try {
      await api.post("/cars/add-car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Car successfully added!");
      navigate("/"); // или в список машин владельца
    } catch (err) {
      if (err.response?.status === 403) {
        alert("You must first complete your owner profile");
        navigate("/owner-profile");
      } else {
        alert("Error while adding car");
      }
    }
  };

return (
  <div className="min-h-screen flex justify-center items-center bg-[#f9f9f9] py-10 px-4">
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {["brand", "model", "year", "color", "capacity", "fuelType", "transmission", "pricePerDay", "description"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={car[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        ))}

        <div>
          <label className="block text-gray-700 font-medium mb-2">Car Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-700 border border-gray-300 rounded-lg p-3 bg-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#f84525] text-white py-4 rounded-xl text-lg font-semibold hover:bg-red-600 transition"
        >
          Add Car
        </button>
      </form>
    </div>
  </div>
);
}

export default AddCar;
