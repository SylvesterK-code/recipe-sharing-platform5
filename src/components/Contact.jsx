// src/components/Contact.jsx

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { supabase } from "../supabaseClient";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("messages").insert([formData]);

    setLoading(false);

    if (error) {
      alert("Error sending message: " + error.message);
    } else {
      alert("Message sent successfully!");
      setFormData({ fullname: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h2 className="text-4xl font-bold text-center text-green-600 dark:text-green-400 mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Have a question or want to get in touch? We'd love to hear from you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side: Contact Form */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="flex items-center border rounded-lg mt-1 px-3 py-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <FaUser className="text-green-600 dark:text-green-400 mr-3" />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Enter your name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full bg-transparent text-gray-800 dark:text-gray-200 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="flex items-center border rounded-lg mt-1 px-3 py-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <FaEnvelope className="text-green-600 dark:text-green-400 mr-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent text-gray-800 dark:text-gray-200 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border rounded-lg mt-1 p-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-200 outline-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg 
                           text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Side: Contact Info + Map */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg flex items-start space-x-4">
              <FaMapMarkerAlt className="text-3xl" />
              <div>
                <h4 className="text-xl font-semibold">Our Location</h4>
                <p>Aflukakpoe-Juapong, Ghana</p>
              </div>
            </div>

            <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg flex items-start space-x-4">
              <FaPhone className="text-3xl" />
              <div>
                <h4 className="text-xl font-semibold">Call Us</h4>
                <p>+233 24 763 8213</p>
              </div>
            </div>

            <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg flex items-start space-x-4">
              <FaEnvelope className="text-3xl" />
              <div>
                <h4 className="text-xl font-semibold">Email</h4>
                <p>sylvesternyadzinor@gmail.com</p>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl shadow-lg overflow-hidden h-64">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31516.703702231865!2d-0.2008898!3d5.6037162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdc662bc5e7c3b7%3A0x620c2a4a8c4bb7!2sAccra!5e0!3m2!1sen!2sgh!4v1700000000000"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
