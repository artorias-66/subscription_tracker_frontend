import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function SignUp({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/sign-up", form);

      // Save JWT & userId in localStorage
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("userId", res.data.data.user._id);

      setUser(res.data.data.user); // update navbar
      navigate("/"); // go to home
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Sign-Up failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="rounded-2xl bg-white/90 backdrop-blur p-6 border border-gray-100 shadow-xl">
        <h2 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
