import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Card } from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API; // Use your API key
const genAI = new GoogleGenerativeAI(apiKey);
console.log("got model")
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const ItinerarySection = ({ tripDetails, itinerary, setItinerary }) => {
  // const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(0); // Track active tab (day)

  // Function to fetch itinerary details using Gemini API
  const fetchItinerary = async () => {
    if (!tripDetails.destination || !tripDetails.startDate || !tripDetails.endDate) return;

    setLoading(true);
    setError(null);

    try {
      const parts = [
        { text: `You are a travel expert. Create a daily itinerary for a trip to ${tripDetails.destination} from ${tripDetails.startDate} to ${tripDetails.endDate}. The traveler enjoys ${tripDetails.preferences || "general outdoor and cultural activities"}. Include timings for activities and be sure to add emojis. no need for an introduction or conclusion or heading. After each day's activities, include the string 'END OF DAY' to mark the end of that day's itinerary. make sure to specify each day's activities in separate lines.No need to embolden text just.` },
        { text: "output: " },
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 700,
          responseMimeType: "text/plain",
        },
      });

      const generatedText = result.response.text();

      // Split the generated text by 'END OF DAY' to separate each day's itinerary
      const days = generatedText.split("END OF DAY").filter(day => day.trim() !== "");

      if (days.length > 0) {
        // Map the days to include day number
        const formattedDays = days.map((dayText, index) => {
          return { date: `Day ${index + 1}`, activities: dayText.trim().split("\n") };
        });
        

        setItinerary(formattedDays);
        console.log(formattedDays);
        
      } else {
        throw new Error("No itinerary found for the trip details");
      }
    } catch (err) {
      setError("Error fetching itinerary: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, [tripDetails]);

  return (
    <section id="itinerary" className="space-y-6 rounded-lg border bg-blue-700 border-gray-700/50 p-6 max-h-[640px] overflow-y-auto">
      <SectionHeader
        icon={<Calendar size={24} />}
        title="Daily Itinerary"
        onAdd={() => console.log("Add Itinerary clicked")}
        addText="Add Activity"
      />
      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-400 text-center col-span-full">Loading itinerary...</p>
        ) : error ? (
          <p className="text-red-500 text-center col-span-full">{error}</p>
        ) : itinerary.length > 0 ? (
          <>
            {/* Tabs */}
            <div className="flex space-x-4 border-b">
              {itinerary.map((day, index) => (
                <button
                  key={index}
                  className={`p-2 ${activeDay === index ? 'bg-blue-500 text-white' : 'text-blue-300'}`}
                  onClick={() => setActiveDay(index)}
                >
                  {day.date}
                </button>
              ))}
            </div>

            {/* Itinerary for the active day */}
            <div className="space-y-4 mt-4">
              <Card className="bg-gray-800/30 max-h-[450px] overflow-y-auto">
                <div className="text-gray-200">
                  {/* Split activities by newline and render each on a new line */}
                  {itinerary[activeDay].activities.map((activity, index) => (
  <p key={index} className="mb-2">{activity}</p>
))}
                </div>
              </Card>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center col-span-full">No itinerary available for this trip</p>
        )}
      </div>
    </section>
  );
};

export default ItinerarySection;
