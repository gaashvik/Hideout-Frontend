import { useState } from "react";
import { CheckCircle, Clipboard } from "lucide-react";
import { Card } from "../components/Card";
import SectionHeader from "../components/SectionHeader";

const PackingChecklistSection = ({tripDetails, checklist, setChecklist}) => {
  

  const toggleCheck = (index) => {
    console.log("clickes");
    setChecklist((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <section id="packing-checklist" className="space-y-6 rounded-lg border bg-blue-700 border-gray-700/50 p-6 max-h-[640px] overflow-y-auto">
      <SectionHeader
        icon={<Clipboard size={24} />}
        title="Packing Checklist"
        onAdd={() => console.log("Add Item clicked")}
        addText="Add Item"
      />
      <div className="space-y-4">
        {checklist.map((item, index) => (
          <Card key={index} className="cursor-pointer bg-gray-800/30">
            <div className="flex items-center space-x-4"  onClick={() => toggleCheck(index)}>
              <CheckCircle
                className={`w-5 h-5 ${item.checked ? "text-green-400" : "text-gray-400"}`}
              />
              <span className={`${item.checked ? "line-through text-gray-500" : "text-white"}`}>
                {item.item}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PackingChecklistSection;