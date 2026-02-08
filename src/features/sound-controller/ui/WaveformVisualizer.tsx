'use client';

import { useRef, useEffect, useCallback } from 'react';

interface WaveformVisualizerProps {
  analyserNode: AnalyserNode | null;
  isActive: boolean;
}

/**
 * 실시간 오디오 파형 시각화 컴포넌트
 * Web Audio API AnalyserNode + Canvas로 파형 렌더링
 */
export function WaveformVisualizer({ analyserNode, isActive }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserNode) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNode.getByteTimeDomainData(dataArray);

    const { width, height } = canvas;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, width, height);

    // Get CSS variable colors
    const style = getComputedStyle(canvas);
    const accentColor = style.getPropertyValue('--accent').trim() || '#2563eb';
    const borderColor = style.getPropertyValue('--border').trim() || '#e5e7eb';

    // Center line
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Waveform
    ctx.lineWidth = 2 * dpr;
    ctx.strokeStyle = accentColor;
    ctx.beginPath();

    const sliceWidth = width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();

    animationRef.current = requestAnimationFrame(draw);
  }, [analyserNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isActive && analyserNode) {
      animationRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, analyserNode, draw]);

  return (
    <div className="w-full rounded-lg border border-border bg-secondary overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-16 md:h-20"
        style={{
          // Pass CSS variables to canvas drawing context
          // @ts-expect-error CSS custom properties
          '--accent': 'var(--accent)',
          '--border': 'var(--border)',
        }}
      />
    </div>
  );
}
