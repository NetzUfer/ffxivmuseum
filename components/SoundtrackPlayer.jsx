import React, { useRef, useState } from "react";
const tracks = [
  { name: "Eorzea Dawn", src: "/music/eorzea-dawn.mp3" },
  { name: "Crystal Theme", src: "/music/crystal-theme.mp3" },
];
const SoundtrackPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-eorzea-dark/90 border border-eorzea-gold rounded-lg p-3 flex items-center space-x-3 shadow-lg">
      <button
        onClick={() => {
          setPlaying((p) => {
            if (!p) audioRef.current.play();
            else audioRef.current.pause();
            return !p;
          });
        }}
        className="text-eorzea-gold"
      >
        {playing ? "⏸" : "▶️"}
      </button>
      <span className="font-cinzel text-eorzea-gold">{tracks[track].name}</span>
      <button
        onClick={() => {
          setTrack((t) => (t + 1) % tracks.length);
          setPlaying(false);
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }}
        className="text-eorzea-gold"
      >
        ⏭
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.5}
        onChange={(e) => (audioRef.current.volume = e.target.value)}
        className="ml-2"
      />
      <audio ref={audioRef} src={tracks[track].src} loop onEnded={() => setPlaying(false)} />
    </div>
  );
};
export default SoundtrackPlayer;
