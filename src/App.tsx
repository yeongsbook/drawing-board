import React, { useEffect, useRef } from "react";

const DEFAULT_CANVAS_WIDTH = 600;
const DEFAULT_CANVAS_HEIGHT = 300;
const PEN_SIZE = 30;

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
    ctx.fillStyle = "#000";
    const canvasRect = canvas.getBoundingClientRect();
    let dragging = false;

    const draw = (e: MouseEvent) => {
      ctx.beginPath();
      ctx.arc(
        e.clientX - canvasRect.x,
        e.clientY - canvasRect.y,
        PEN_SIZE / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };
    const handleMousedown = (e: MouseEvent) => {
      draw(e);
      dragging = true;
    };
    const handleMousemove = (e: MouseEvent) => {
      if (!dragging) return;
      draw(e);
    };
    const handleMouseup = (e: MouseEvent) => {
      if (!dragging) return;
      dragging = false;
    };

    canvas.addEventListener("mousedown", handleMousedown);
    canvas.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);

    return () => {
      window.removeEventListener("mouseup", handleMouseup);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
