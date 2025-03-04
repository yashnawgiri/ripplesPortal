import { useEffect, useRef } from "react";

import { cn } from "@/utils/utils";

export function HolographicGradient({
  className,
  children,
  parallaxIntensity = 20,
}: {
  className?: string;
  children?: React.ReactNode;
  parallaxIntensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    const animate = () => {
      time += 0.005;

      // Smooth parallax movement
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(
        width * targetX,
        height * targetY,
        width * (1 - targetX),
        height * (1 - targetY),
      );

      // Dynamic color stops based on mouse position and time
      gradient.addColorStop(
        0,
        `hsl(${(time * 50 + targetX * parallaxIntensity) % 360}, 100%, 50%)`,
      );
      gradient.addColorStop(
        0.3,
        `hsl(${(time * 50 + 60 + targetY * parallaxIntensity) % 360}, 100%, 60%)`,
      );
      gradient.addColorStop(
        0.6,
        `hsl(${(time * 50 + 120 + targetX * parallaxIntensity) % 360}, 100%, 70%)`,
      );
      gradient.addColorStop(
        1,
        `hsl(${(time * 50 + 180 + targetY * parallaxIntensity) % 360}, 100%, 50%)`,
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [parallaxIntensity]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80 transition-opacity duration-300"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
