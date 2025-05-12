import { useState } from "react";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/auth/forgot-password?email=${email}`);
      setMessage("Письмо отправлено на почту!");
    } catch (err) {
      setMessage("Ошибка! Email не найден");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Восстановление пароля</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Отправить
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
