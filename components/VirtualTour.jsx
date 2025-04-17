import React, { useRef, useEffect, useState } from "react";
const hotspots = [
  { x: 30, y: 50, label: "Crystal Hall", lore: "The heart of the museum, inspired by the Crystal Tower." },
  { x: 70, y: 30, label: "Allagan Wing", lore: "A section dedicated to Allagan technology and history." },
];
const VirtualTour = () => {
  const [active, setActive] = useState(null);
  return (
    <div className="relative w-full h-96 bg-eorzea-dark rounded-lg overflow-hidden shadow-glow">
      <img src="/virtualtour/360-placeholder.jpg" alt="360° Museum" className="w-full h-full object-cover" />
      {hotspots.map((h, i) => (
        <button
          key={i}
          className="absolute bg-eorzea-gold/80 rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:scale-110 transition"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          onClick={() => setActive(i)}
        >
          <span className="text-eorzea-dark font-bold">?</span>
        </button>
      ))}
      {active !== null && (
        <div className="absolute left-1/2 top-1/2 bg-eorzea-dark/90 text-eorzea-gold p-4 rounded-lg shadow-lg"
          style={{ transform: "translate(-50%, -50%)" }}>
          <h4 className="font-cinzel mb-2">{hotspots[active].label}</h4>
          <p>{hotspots[active].lore}</p>
          <button className="btn btn-secondary mt-2" onClick={() => setActive(null)}>Close</button>
        </div>
      )}
    </div>
  );
};
export default VirtualTour;
