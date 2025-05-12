import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/auth/reset-password?token=${token}&newPassword=${password}`);
      setMsg("Пароль успешно изменён");
    } catch (err) {
      setMsg("Ошибка сброса пароля");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Сброс пароля</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 text-white p-2 rounded">
          Сбросить пароль
        </button>
      </form>
      {msg && <p className="mt-4 text-center text-sm">{msg}</p>}
    </div>
  );
};

export default ResetPassword;
