import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          Welcome to our platform! We are dedicated to providing an intuitive
          and user‑friendly experience that empowers individuals to explore,
          learn, and grow. Our mission is to make technology accessible,
          engaging, and meaningful for everyone.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-6">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-lg  shadow-green-600 hover:shadow-2xl transition-shadow"
        >
          <h3 className="text-xl font-semibold text-green-800 mb-3">
            Our Vision
          </h3>
          <p className="text-gray-600 text-base">
            To become a leading digital space that inspires creativity,
            innovation, and continuous learning.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white p-6 rounded-2xl shadow-lg  shadow-green-600 hover:shadow-2xl transition-shadow"
        >
          <h3 className="text-xl font-semibold text-green-800 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-600 text-base">
            We aim to create impactful digital solutions that simplify tasks and
            enhance productivity.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-gray p-6 rounded-2xl shadow-lg shadow-green-600 hover:shadow-2xl transition-shadow"
        >
          <h3 className="text-xl font-semibold text-green-800 mb-3">
            Our Values
          </h3>
          <p className="text-gray-600 text-base">
            We believe in innovation, transparency, collaboration, and putting
            users first in every decision.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-3xl mt-14 text-center"
      >
        <h2 className="text-3xl font-semibold text-green-800 mb-4">
          Meet the Team
        </h2>
        <p className="text-gray-600 text-lg">
          We are a team of passionate designers, developers, and creators who
          work together to build clean, modern, and high‑quality user
          experiences.
        </p>
      </motion.div>
    </div>
  );
}
