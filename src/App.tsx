import React, { useEffect, useRef, useState } from "react";

const DEFAULT_CANVAS_WIDTH = 600;
const DEFAULT_CANVAS_HEIGHT = 300;
const DEFAULT_PEN_SIZE = 5;

function App() {
  const [penSize, setPenSize] = useState<number>(DEFAULT_PEN_SIZE);
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
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = penSize;
    ctx.translate(-canvasRect.x, -canvasRect.y);

    const draw = (e: MouseEvent) => {
      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, penSize / 2, 0, Math.PI * 2);
      ctx.fill();
    };
    const handleMousedown = (e: MouseEvent) => {
      draw(e);
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
      dragging = true;
    };
    const handleMousemove = (e: MouseEvent) => {
      if (!dragging) return;
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    };
    const handleMouseup = (e: MouseEvent) => {
      if (!dragging) return;
      ctx.closePath();
      dragging = false;
    };

    canvas.addEventListener("mousedown", handleMousedown);
    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);

    return () => {
      canvas.removeEventListener("mousedown", handleMousedown);
      window.removeEventListener("mousemove", handleMouseup);
      window.removeEventListener("mouseup", handleMouseup);
    };
  }, [penSize]);

  const handleChangePenSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPenSize(parseInt(e.target.value));
  };

  return (
    <div>
      <div className="menu">
        <div className="menu-item">
          <strong className="menu-title">펜 굵기 {penSize}</strong>
          <div className="menu-content">
            <input
              type="range"
              min={1}
              max={30}
              value={penSize}
              className="range-input"
              onChange={handleChangePenSize}
            />
          </div>
        </div>
      </div>
      <div className="canvas-area">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
