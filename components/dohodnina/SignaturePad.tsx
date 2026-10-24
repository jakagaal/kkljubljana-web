"use client";

import { useEffect, useRef } from "react";

type SignaturePadProps = {
  /** Called with a PNG data URL after each stroke, or "" when cleared. */
  onChange: (dataUrl: string) => void;
  invalid?: boolean;
};

/**
 * Finger, pen or mouse signature on a canvas. Draws at device resolution so
 * the printed form stays sharp, and exports a transparent PNG.
 */
export function SignaturePad({ onChange, invalid }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasInk = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      // Resizing wipes the canvas, so start over rather than keep a
      // stretched half-signature.
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "#0a0a0a";
      if (hasInk.current) {
        hasInk.current = false;
        onChange("");
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [onChange]);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const { x, y } = point(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    // A tap still leaves a dot.
    ctx.lineTo(x + 0.1, y + 0.1);
    ctx.stroke();
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    const { x, y } = point(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    hasInk.current = true;
  };

  const end = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    drawing.current = false;
    if (hasInk.current) onChange(e.currentTarget.toDataURL("image/png"));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    hasInk.current = false;
    onChange("");
  };

  return (
    <div>
      <div
        className={`relative border bg-paper ${invalid ? "border-blood" : "border-ink/30"}`}
      >
        <canvas
          ref={canvasRef}
          aria-label="Polje za podpis. Podpišite se s prstom ali miško."
          role="img"
          className="block h-44 w-full touch-none cursor-crosshair"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          onPointerLeave={end}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-6 right-6 bottom-10 border-b border-dashed border-ink/25"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-6 bottom-4 label text-ink/35"
        >
          Podpis
        </span>
      </div>
      <button
        type="button"
        onClick={clear}
        className="mt-3 label text-ink/60 hover:text-blood transition-colors"
      >
        Počisti podpis
      </button>
    </div>
  );
}
