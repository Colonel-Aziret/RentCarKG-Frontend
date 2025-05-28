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
    if (!ownerEmail) return alert("Not authorized");

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
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["brand", "model", "year", "color", "capacity", "fuelType", "transmission", "pricePerDay", "description"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={car[field]}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        ))}
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit" className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-700">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
