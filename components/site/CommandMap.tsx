"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  pulse: number;
};

const points: NodePoint[] = [
  { x: 0.11, y: 0.28, pulse: 0.2 },
  { x: 0.18, y: 0.57, pulse: 0.8 },
  { x: 0.28, y: 0.38, pulse: 0.4 },
  { x: 0.39, y: 0.68, pulse: 0.7 },
  { x: 0.48, y: 0.34, pulse: 0.1 },
  { x: 0.58, y: 0.53, pulse: 0.6 },
  { x: 0.68, y: 0.25, pulse: 0.9 },
  { x: 0.75, y: 0.71, pulse: 0.3 },
  { x: 0.86, y: 0.43, pulse: 0.5 },
  { x: 0.93, y: 0.62, pulse: 0.75 },
];

const links = [
  [0, 2],
  [1, 2],
  [2, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 8],
  [6, 8],
  [7, 8],
  [8, 9],
  [1, 3],
  [3, 7],
] as const;

export function CommandMap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const draw = () => {
      frame += 0.006;
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.55,
      );
      gradient.addColorStop(0, "rgba(37, 99, 235, 0.16)");
      gradient.addColorStop(0.42, "rgba(20, 184, 255, 0.05)");
      gradient.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let x = -60; x < width + 60; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x + Math.sin(frame * 2) * 4, 0);
        ctx.lineTo(x + width * 0.18, height);
        ctx.stroke();
      }
      for (let y = 20; y < height + 60; y += 78) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.cos(frame * 1.4) * 10);
        ctx.stroke();
      }
      ctx.restore();

      const resolved = points.map((point) => {
        const baseX = point.x * width;
        const baseY = point.y * height;
        const dx = mouse.x - baseX;
        const dy = mouse.y - baseY;
        const distance = Math.max(90, Math.hypot(dx, dy));
        const pull = Math.min(20, 2600 / distance);
        return {
          x: baseX + (dx / distance) * pull,
          y: baseY + (dy / distance) * pull,
          pulse: point.pulse,
        };
      });

      links.forEach(([fromIndex, toIndex], index) => {
        const from = resolved[fromIndex];
        const to = resolved[toIndex];
        const pulse = (Math.sin(frame * 5 + index) + 1) / 2;
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 + pulse * 0.18})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        const t = (frame * (0.16 + index * 0.004) + index * 0.13) % 1;
        const packetX = from.x + (to.x - from.x) * t;
        const packetY = from.y + (to.y - from.y) * t;
        const packetGlow = ctx.createRadialGradient(
          packetX,
          packetY,
          0,
          packetX,
          packetY,
          20,
        );
        packetGlow.addColorStop(0, "rgba(96, 198, 255, 0.9)");
        packetGlow.addColorStop(1, "rgba(37, 99, 235, 0)");
        ctx.fillStyle = packetGlow;
        ctx.beginPath();
        ctx.arc(packetX, packetY, 20, 0, Math.PI * 2);
        ctx.fill();
      });

      resolved.forEach((point, index) => {
        const pulse = (Math.sin(frame * 4 + point.pulse * 8) + 1) / 2;
        ctx.fillStyle = "rgba(255,255,255,0.82)";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 + pulse * 0.38})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 7 + pulse * 9 + (index % 3), 0, Math.PI * 2);
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="command-map" aria-hidden="true" />;
}
