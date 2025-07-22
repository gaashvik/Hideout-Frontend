import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

export const Activities = ({destination,activities, setActivities}) => {
  // const [activities, setActivities] = useState([]);

//   useEffect(() => {
//     if (!destination) return;

//     const fetchActivities = async () => {
//       setLoading(true);
//       try {
//         const prompt = `You are a travel expert. Suggest 5 engaging activities for a trip to ${destination}. 
//         The traveler enjoys: ${"general outdoor and cultural activities"}. Make sure to add emojis .`;
//         console.log(preferences);
//         const parts = [
//           { text: "You are a travel agent, you are humurous and always try to spark excitement about a location. As input you are given a destination and user preferrance and  Suggest 5 engaging activities for a trip to that destination based on preferance. no need to give description just heading is enough. make sure to add emojisNo Need to bolden activities names" }, // Your predefined input structure for engaging output
//           { text: `input: Destination:${destination} Prefferance:${preferences || "general outdoor and cultural activities"}` },
//           { text: "output: " },
//         ];
//         const result = await model.generateContent({
//           contents: [{ role: "user", parts }],
//           generationConfig: {
//             temperature: 1,
//             topP: 0.95,
//             topK: 40,
//             maxOutputTokens: 500,
//             responseMimeType: "text/plain",
//           },
//         });

//         const generatedText = result.response.text();
//         const activityList = generatedText.split("\n").filter(item => item.trim() !== "");
//         setActivities(activityList);
//         console.log(activityList);
//       } catch (error) {
//         console.error("Error fetching activities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActivities();
//   }, [destination]);

  return (
    <motion.div
      className="bg-blue-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-3">
        🎡 Top Activities in {destination}
      </h2>
      {(
        <ul className="list-disc list-inside space-y-2">
          {activities.map((activity, index) => (
            <motion.li
              key={index}
              className="text-white opacity-80"
              whileHover={{ scale: 1.05 }}
            >
              {activity}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};