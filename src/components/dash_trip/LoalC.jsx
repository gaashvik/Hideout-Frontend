import { useState, useEffect } from "react";
import { Utensils, Star } from "lucide-react";
import { Card } from "../../components/Card";
import SectionHeader from "../../components/SectionHeader";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
// const apiKey =import.meta.env.VITE_GEMINI_API; // Use your API key
// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const LocalCuisinesSection = ({ destination, cuisines, setCuisines }) => {
  // const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   // Function to fetch cuisines using Gemini API
//   const fetchCuisines = async () => {
//     if (!destination) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const parts = [
//           { text: `You are a culinary expert. Recommend 4 local cuisines for a trip to a destination which will be provided as input. Make sure to include brief descriptions (10-12 words each). Add emojis where applicable. just jump straight into cuisines no need for a introduction or conclusion or heading just Cuisinies. No Need to bolden cuisines names just make them capitalized.` },
//           { text: `input: Destination:${destination} ` },
//           { text: "output: " },
//         ];
//       const result = await model.generateContent({
//         contents: [{ role: "user", parts }],
//         generationConfig: {
//           temperature: 0.9,
//           topP: 0.95,
//           topK: 40,
//           maxOutputTokens: 500,
//           responseMimeType: "text/plain",
//         },
//       });

//       const generatedText = result.response.text();
      
//       // Directly use the generated text without any modification
//       const cuisineList = generatedText.split("\n").filter(item => item.trim() !== "");

//       if (cuisineList.length > 0) {
//         const mappedCuisines = cuisineList.map((item) => {
//           const parts = item.split(":");
//           return {
//             name: parts[0]?.trim(),
//             description: parts[1]?.trim(),
//             rating: Math.floor(Math.random() * (5 - 3) + 3), // Random rating between 3 and 5
//           };
//         });

//         setCuisines(mappedCuisines);
//         console.log(mappedCuisines);
//       } else {
//         throw new Error("No cuisines found for the destination");
//       }
//     } catch (err) {
//       setError("Error fetching cuisines: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCuisines();
//   }, [destination]);

  return (
    <section id="cuisines" className="bg-blue-700 space-y-8 rounded-lg border border-gray-700/50 p-8">
      <SectionHeader
        icon={<Utensils size={24} />}
        title="Local Cuisines"
        onAdd={() => console.log("Add Cuisine clicked")}
        addText="Add Cuisine"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {loading ? (
          <p className="text-gray-400 text-center col-span-full">Loading cuisines...</p>
        ) : error ? (
          <p className="text-red-500 text-center col-span-full">{error}</p>
        ) : cuisines.length > 0 ? (
          cuisines.map((cuisine, index) => (
            <Card key={index} className="bg-gray-800/30">
              <div className="space-y-2">
                <h3 className="text-md font-semibold">{cuisine.name}</h3>
                <p className="text-gray-300">{cuisine.description}</p>
                <div className="flex items-center text-gray-400">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  <span>{cuisine.rating}</span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">No cuisines available for this destination</p>
        )}
      </div>
    </section>
  );
};

export default LocalCuisinesSection;
