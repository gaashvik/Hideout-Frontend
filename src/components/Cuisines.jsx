import { useState, useEffect } from "react";
import { Utensils, Star } from "lucide-react";
import { Card } from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const apiKey =import.meta.env.VITE_GEMINI_API; // Use your API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const LocalCuisinesSection = ({ destination, cuisines, setCuisines }) => {
  // const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch cuisines using Gemini API
  const fetchCuisines = async () => {
    if (!destination) return;

    setLoading(true);
    setError(null);

    try {
      const parts = [
          { text: `You are a culinary expert. Recommend 4 local cuisines for a trip to a destination which will be provided as input. Make sure to include brief descriptions (10-12 words each). Add emojis where applicable. just jump straight into cuisines no need for a introduction or conclusion or heading just Cuisinies. No Need to bolden cuisines names just make them capitalized.` },
          { text: `input: Destination:${destination} ` },
          { text: "output: " },
        ];
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 500,
          responseMimeType: "text/plain",
        },
      });

      const generatedText = result.response.text();
      
      // Directly use the generated text without any modification
      const cuisineList = generatedText.split("\n").filter(item => item.trim() !== "");

      if (cuisineList.length > 0) {
        const mappedCuisines = cuisineList.map((item) => {
          const parts = item.split(":");
          return {
            name: parts[0]?.trim(),
            description: parts[1]?.trim(),
            rating: Math.floor(Math.random() * (5 - 3) + 3), // Random rating between 3 and 5
          };
        });

        setCuisines(mappedCuisines);
        console.log(mappedCuisines);
      } else {
        throw new Error("No cuisines found for the destination");
      }
    } catch (err) {
      setError("Error fetching cuisines: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, [destination]);

  return (
    <section className="bg-blue-700 space-y-6 rounded-lg border border-gray-700/50 p-6 max-h-[640px] overflow-y-auto">
      <SectionHeader
        icon={<Utensils size={24} />}
        title="Local Cuisines"
        onAdd={() => console.log("Add Cuisine clicked")}
        addText="Add Cuisine"
      />
      
      <div className="grid gap-4 place-items-center">
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <p className="text-gray-400">Loading cuisines...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-24">
            <p className="text-red-500">{error}</p>
          </div>
        ) : cuisines.length > 0 ? (
          cuisines.map((cuisine, index) => (
            <Card 
              key={index} 
              className="bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 w-full max-w-2xl transform hover:-translate-y-1"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white/90">{cuisine.name}</h3>
                  <div className="flex items-center text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="text-sm">{cuisine.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{cuisine.description}</p>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center h-24">
            <p className="text-gray-400">No cuisines available for this destination</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocalCuisinesSection;
