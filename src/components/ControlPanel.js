"use strict";
import React, { useState } from "react";
import CITIES from "../../public/data/cities.json";

function ControlPanel({ onSelectCity }) {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  const handleSelectCity = (index) => {
    const selectedCity = CITIES[index];
    setCurrentCityIndex(index);
    onSelectCity(selectedCity);
  };

  return (
    <div className="fixed top-28 left-6 z-20 bg-zinc-900 text-white p-4 rounded-lg shadow-lg w-[300px] max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Select a City</h3>
      <ul className="space-y-2">
        {CITIES.map((city, index) => (
          <li
            key={city.city}
            onClick={() => handleSelectCity(index)}
            className={`p-2 rounded-md cursor-pointer ${
              index === currentCityIndex
                ? "bg-gray-500 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            {city.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ControlPanel;
