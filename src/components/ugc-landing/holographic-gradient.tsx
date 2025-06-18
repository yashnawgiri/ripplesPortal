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
  const rafRef = useRef<number>();
  const isMobile = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Check if device is mobile
    isMobile.current = window.innerWidth <= 768;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile.current) return;

      const rect = container.getBoundingClientRect();

      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isMobile.current) return;

      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];

      mouseX = (touch.clientX - rect.left) / rect.width;
      mouseY = (touch.clientY - rect.top) / rect.height;
    };

    const animate = () => {
      time += 0.005;

      // Smooth parallax movement with reduced intensity for mobile
      const intensity = isMobile.current
        ? parallaxIntensity * 0.5
        : parallaxIntensity;

      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(
        width * (0.5 + ((targetX - 0.5) * intensity) / 100),
        height * (0.5 + ((targetY - 0.5) * intensity) / 100),
        width * (0.5 - ((targetX - 0.5) * intensity) / 100),
        height * (0.5 - ((targetY - 0.5) * intensity) / 100),
      );

      // Optimized color stops with reduced complexity for mobile
      const baseHue = (time * 50) % 360;
      const colorStops = isMobile.current ? 3 : 4;

      for (let i = 0; i < colorStops; i++) {
        const stop = i / (colorStops - 1);
        const hue = (baseHue + i * 60) % 360;
        const saturation = 100;
        const lightness = 50 + i * 10;

        gradient.addColorStop(
          stop,
          `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        );
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      // Update mobile check on resize
      isMobile.current = window.innerWidth <= 768;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    animate();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
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
