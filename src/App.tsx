import React, { useEffect, useRef } from "react";

const DEFAULT_CANVAS_WIDTH = 600;
const DEFAULT_CANVAS_HEIGHT = 300;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio;
    canvas.style.width = DEFAULT_CANVAS_WIDTH + "px";
    canvas.style.height = DEFAULT_CANVAS_HEIGHT + "px";
    canvas.width = DEFAULT_CANVAS_WIDTH * dpr;
    canvas.height = DEFAULT_CANVAS_HEIGHT * dpr;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
