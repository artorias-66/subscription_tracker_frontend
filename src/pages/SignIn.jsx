import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function SignIn({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const res = await API.post("/auth/sign-in", form);

      // Save JWT & userId in localStorage
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("userId", res.data.data.user._id);

      // Update user state for navbar and subscriptions page
      setUser(res.data.data.user);

      // Navigate to home or subscriptions
      navigate("/subscriptions");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Sign-In failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="rounded-2xl bg-white/90 backdrop-blur p-6 border border-gray-100 shadow-xl">
        <h2 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition font-medium"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
