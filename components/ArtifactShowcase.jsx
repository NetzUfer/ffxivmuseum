import React, { useEffect, useRef } from "react";

const artifacts = [
  { name: "Allagan Tomestone", img: "/artifacts/tomestone.jpg" },
  { name: "Crystal of Light", img: "/artifacts/crystal.jpg" },
  { name: "Garlean Engine", img: "/artifacts/engine.jpg" },
];

const ArtifactShowcase = () => {
  const showcaseRef = useRef(null);
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      if (showcaseRef.current) {
        showcaseRef.current.style.transform = `rotateY(${angle}deg)`;
        angle = (angle + 1) % 360;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full flex justify-center">
      <div
        ref={showcaseRef}
        className="w-80 h-80 mx-auto relative transition-transform duration-500"
        style={{ perspective: "1000px" }}
      >
        {artifacts.map((a, i) => (
          <div
            key={a.name}
            className="absolute left-1/2 top-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `rotateY(${i * 120}deg) translateZ(180px)`,
              boxShadow: "0 0 20px 5px #c9a66b88",
              borderRadius: "1rem",
              background: "#0a1428cc",
              border: "2px solid #c9a66b",
              overflow: "hidden",
              transition: "box-shadow 0.3s",
            }}
          >
            <img src={a.img} alt={a.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 w-full bg-eorzea-dark/80 text-eorzea-gold text-center py-2 font-cinzel">{a.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ArtifactShowcase;
