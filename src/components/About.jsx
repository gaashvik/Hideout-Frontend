import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Gemini model

// API setup
const apiKey = import.meta.env.VITE_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function generateRouteText(routeText) {
  const parts = [
    { text: "You are a travel agent that is very knowledgable about places and has fun tid bids about places, you are humurous and always try to spark excitement about a location. As input you are given a destination and your job is to tell the user about the place. keep it one paragraph long." }, // Your predefined input structure for engaging output
    { text: `input:${routeText}` },
    { text: "output: " },
  ];
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });
  return result.response.text();
}

export const About = ({ destination,aboutPlaces, setAboutPlaces }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const description = await generateRouteText(destination); // Pass destination to the API
        setAboutPlaces(description);
        console.log(description);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destination details:", error);
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [destination]);

  if (loading) {
    return (
      <motion.div
        className="bg-blue-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 text-justify"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-3">📍 About {destination}</h2>
        <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
          <img
            src="../img/main.jpg"
            alt="Destination"
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
          />
        </div>
        <p className="text-white opacity-80">Loading details...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-blue-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 text-justify"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-3">📍 About {destination}</h2>
      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
        <img
          src="../img/main.jpg" // You can dynamically change this URL based on destination details
          alt={destination}
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
        />
      </div>
      <p className="text-white opacity-80">{aboutPlaces}</p>
    </motion.div>
  );
};
