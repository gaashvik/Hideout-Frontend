
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageSquare, Loader2 } from "lucide-react";

const apiKey = import.meta.env.VITE_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const Chatbot = ({ tripdets, cuisines, setCuisines, setChecklist }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "system",
      text: `You are a friendly and helpful travel assistant. Keep responses concise, engaging, and always use a welcoming tone. 
            
      The user has provided the following trip details:
      - Destination: ${tripdets.destination || "Not Provided"}
      - Start Date: ${tripdets.startDate || "Not Provided"}
      - End Date: ${tripdets.endDate || "Not Provided"}
      - Adults: ${tripdets.adults || 1}
      - Children: ${tripdets.children || 0}
      - Budget: $${tripdets.budget || "Not Provided"}
      - Preferences: ${tripdets.preferences || "None"}
      - City Code: ${tripdets.cityCode || "None"}`
    },
    { 
      role: "assistant", 
      text: "👋 Hello! I'm your personal travel assistant. How can I help plan your perfect trip today?" 
    }
  ]);

  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    if (input.toLowerCase().includes("create a packing checklist")) {
      await generatePackingChecklist();
      setIsLoading(false);
      return;
    }

    const addMatch = input.match(/add (.+) to cuisines/i);
    const removeMatch = input.match(/remove (.+) from cuisines/i);

    if (addMatch) {
      const cuisineName = addMatch[1].trim();
      await addCuisine(cuisineName);
      setIsLoading(false);
      return;
    }

    if (removeMatch) {
      const cuisineName = removeMatch[1].trim();
      removeCuisine(cuisineName);
      setIsLoading(false);
      return;
    }

    try {
      const parts = newMessages.map(msg => ({ text: msg.text }));
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 500,
          responseMimeType: "text/plain",
        },
      });

      const aiResponse = result.response.text();
      setMessages([...newMessages, { role: "assistant", text: aiResponse }]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setMessages([...newMessages, { 
        role: "assistant", 
        text: "I apologize, but I encountered an error. Please try again." 
      }]);
    }
    setIsLoading(false);
  };

  const generatePackingChecklist = async () => {
    try {
      const prompt = `Generate a packing checklist for a trip to ${tripdets.destination} from ${tripdets.startDate} to ${tripdets.endDate}. Include items for ${tripdets.adults} adults and ${tripdets.children} children. Consider the budget of $${tripdets.budget} and preferences: ${tripdets.preferences}. Provide the checklist as a JSON array of objects with "item" and "checked" properties. Example: [{ "item": "Passport", "checked": false }, { "item": "Sunscreen", "checked": false }]. give only 5`;
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
  
      const response = result.response.text();
      const cleanedResponse = response.replace(/```json|```/g, "").trim();
      const checklist = JSON.parse(cleanedResponse);
  
      setChecklist(prev => [...prev, ...checklist]);
      
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "✨ I've created your packing checklist! Check it out in the checklist section above." },
      ]);
    } catch (error) {
      console.error("Error generating packing checklist:", error);
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "Sorry, I couldn't generate a packing checklist. Please try again later." },
      ]);
    }
  };

  const addCuisine = async (cuisineName) => {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: `Describe ${cuisineName} cuisine in 10-12 words.` }] }],
      });

      const description = result.response.text();
      const newCuisine = {
        name: cuisineName,
        description: description,
        rating: Math.floor(Math.random() * (5 - 3) + 3),
      };

      setCuisines(prev => [...prev, newCuisine]);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: `✅ Added "${cuisineName}" to your cuisine preferences!` 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: "I couldn't add the cuisine. Please try again." 
      }]);
    }
  };

  const removeCuisine = (cuisineName) => {
    setCuisines(prev => prev.filter(cuisine => 
      cuisine.name.toLowerCase() !== cuisineName.toLowerCase()
    ));
    setMessages(prev => [...prev, { 
      role: "assistant", 
      text: `🗑️ Removed "${cuisineName}" from your cuisine preferences.` 
    }]);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden transform transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-white" />
              <h2 className="text-white font-semibold">Grettings from Hiddy</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) =>
              msg.role !== "system" && (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              )
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form 
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-gray-200"
          >
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`p-3 rounded-xl ${
                  input.trim() && !isLoading
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300"
                } transition-colors duration-200`}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;