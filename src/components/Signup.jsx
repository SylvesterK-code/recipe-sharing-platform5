// src/components/Signup.jsx

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const { email, password, fullname } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullname },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup successful! Check your email to verify your account.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-500 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-2">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800">
              <FaUser className="text-green-600 mr-3" />
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
            </div>
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block">
              Email (use valid email)
            </label>
            <div className="flex items-center border rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800">
              <FaEnvelope className="text-green-600 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800">
              <FaLock className="text-green-600 mr-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full bg-transparent outline-none dark:text-white"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800">
              <FaLock className="text-green-600 mr-3" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full bg-transparent outline-none dark:text-white"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold shadow-lg transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-700 dark:text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-700 dark:text-blue-400 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
