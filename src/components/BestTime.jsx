import { CalendarDays, Sun, CloudRain } from "lucide-react";
import { Card } from "../components/Card";
import SectionHeader from "../components/SectionHeader";

const BestTimeToVisitSection = () => {
  const seasons = [
    { season: "Winter", months: "November - March", icon: <Sun className="w-5 h-5 text-yellow-400" /> },
    { season: "Spring", months: "April - June", icon: <CloudRain className="w-5 h-5 text-blue-400" /> },
    { season: "Summer", months: "July - September", icon: <Sun className="w-5 h-5 text-orange-400" /> },
    { season: "Autumn", months: "October - November", icon: <CloudRain className="w-5 h-5 text-gray-400" /> },
  ];

  return (
    <div id="best-time-to-visit" className="w-full mx-auto space-y-8 rounded-lg border border-gray-700/50 p-6 bg-blue-700">
      <SectionHeader
        icon={<CalendarDays size={24} />}
        title="Best Time to Visit"
        onAdd={() => console.log("Add Season clicked")}
        addText="Add Season"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {seasons.map((season, index) => (
          <Card key={index} className="w-full bg-gray-800/30">
            <div className="flex flex-col items-center text-center space-y-2">
              {season.icon}
              <h3 className="text-lg font-semibold">{season.season}</h3>
              <p className="text-gray-400 text-sm break-words">{season.months}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BestTimeToVisitSection;
