import React, { useEffect, useRef } from "react";

const WeatherAurora = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.globalAlpha = 0.2 + 0.1 * i;
        ctx.beginPath();
        ctx.moveTo(0, 100 + 30 * i + 20 * Math.sin(frame / 40 + i));
        for (let x = 0; x <= canvas.width; x += 10) {
          ctx.lineTo(
            x,
            100 +
              30 * i +
              20 * Math.sin(frame / 40 + i + x / 100) +
              10 * Math.sin(frame / 20 + x / 50)
          );
        }
        ctx.strokeStyle = ["#9e7eb9", "#2a5c45", "#c9a66b"][i];
        ctx.lineWidth = 20 - i * 5;
        ctx.shadowBlur = 30;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.stroke();
        ctx.restore();
      }
      frame++;
      requestAnimationFrame(draw);
    };
    canvas.width = window.innerWidth;
    canvas.height = 200;
    draw();
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    });
    return () => window.removeEventListener("resize", () => {});
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full"
      style={{ height: 200, pointerEvents: "none", zIndex: 2 }}
    />
  );
};
export default WeatherAurora;
