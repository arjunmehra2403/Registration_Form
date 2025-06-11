import React, { useState } from "react";
import bannerImage from "../assets/banner.jpg"; // <- make sure this image is available

const StepOne = ({ email, setEmail, mode, setMode, errors }) => {
  return (
    <div className="max-w-2xl mx-auto bg-green-50 shadow-lg rounded-lg overflow-hidden border border-green-300">
      {/* Banner Image */}
      <img src={bannerImage} alt="Green Banner" className="w-full h-40 object-cover" />

      {/* Event Information Header */}
      <div className="p-6">
       
        <ul className="text-gray-800 text-sm leading-relaxed space-y-1 mb-6">
          <li><span className="font-semibold">Event Name:</span> Greenovation'25</li>
          <li><span className="font-semibold">Organized By:</span> Greenin Urja, Vikasnagar, Dehradun, Uttarakhand</li>
          <li><span className="font-semibold">Last Date:</span> <span className="text-blue-600 underline">31st July 2025</span></li>
          <li><span className="font-semibold">Event Date:</span> <span className="text-blue-600 underline">15th August 2025</span></li>
          <li><span className="font-semibold">Venue:</span> Sarashwati Vidya Mandir Inter College, Babugarh, Vikasnagar, Dehradun, Uttarakhand</li>
        </ul>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block font-semibold mb-1">
            Email ID <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mode of Participation */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Mode of Participation <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-6">
            {["Individual", "Team"].map((opt) => (
              <label key={opt} className="flex items-center text-gray-700">
                <input
                  type="radio"
                  name="mode"
                  value={opt}
                  checked={mode === opt}
                  onChange={(e) => setMode(e.target.value)}
                  className="mr-2 accent-green-600"
                  required
                />
                {opt}
              </label>
            ))}
          </div>
          {errors.mode && (
            <p className="text-red-500 text-sm mt-1">{errors.mode}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;