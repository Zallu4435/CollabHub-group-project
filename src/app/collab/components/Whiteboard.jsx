'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useWhiteboard, useParticipants } from '../store/collabStore.jsx';
import {
  Pencil,
  Square,
  Type,
  Trash2,
  Download,
  Users,
  Palette
} from 'lucide-react';

const COLORS = [
  { name: 'Black', hex: '#111827' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Orange', hex: '#f59e0b' }
];

const SIZES = [2, 3, 4, 6, 8, 12];

export default function Whiteboard({ roomId, user }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const {
    ops,
    cursors,
    tool,
    color,
    size,
    setTool,
    setStyle,
    pushOp,
    setCursor,
    clear
  } = useWhiteboard(roomId, user);
  const { participants } = useParticipants(roomId);
  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const myColor = useMemo(
    () => COLORS[(user?.id || 'me').length % COLORS.length].hex,
    [user]
  );

  // Track cursor position
  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursor({ x, y, color: myColor, name: user?.name || 'You' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [setCursor, myColor, user]);

  // Render canvas operations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;

    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ops
      .sort((a, b) => a.ts - b.ts)
      .forEach((op) => {
        ctx.strokeStyle = op.color || '#111827';
        ctx.fillStyle = op.color || '#111827';
        ctx.lineWidth = op.size || 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (op.type === 'pen') {
          const pts = op.points || [];
          ctx.beginPath();
          pts.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.stroke();
        } else if (op.type === 'rect') {
          const { x, y, w, h } = op;
          ctx.strokeRect(x, y, w, h);
        } else if (op.type === 'text') {
          ctx.font = `${(op.size || 16) * 1.5}px sans-serif`;
          ctx.fillText(op.text || 'Text', op.x, op.y);
        }
      });
  }, [ops]);

  const onPointerDown = (e) => {
    setDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStart({ x, y, points: [{ x, y }] });
  };

  const onPointerMove = (e) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (tool === 'pen') {
      setStart((s) => ({ ...s, points: [...(s?.points || []), { x, y }] }));
    } else {
      setStart((s) => ({ ...s, endX: x, endY: y }));
    }
  };

  const onPointerUp = () => {
    if (!drawing || !start) {
      setDrawing(false);
      return;
    }

    let payload;
    if (tool === 'pen') {
      payload = { type: 'pen', points: start.points };
    } else if (tool === 'rect') {
      const endX = start.endX || start.x;
      const endY = start.endY || start.y;
      payload = {
        type: 'rect',
        x: Math.min(start.x, endX),
        y: Math.min(start.y, endY),
        w: Math.abs(endX - start.x),
        h: Math.abs(endY - start.y)
      };
    } else if (tool === 'text') {
      const text = prompt('Enter text:', 'Hello');
      if (!text) {
        setDrawing(false);
        setStart(null);
        return;
      }
      payload = { type: 'text', x: start.x, y: start.y, text };
    }

    pushOp({ id: `op-${Date.now()}`, ...payload, color, size, ts: Date.now() });
    setDrawing(false);
    setStart(null);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `whiteboard-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-gray-50 to-white flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Tool Selection */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
            {[
              { id: 'pen', icon: Pencil, label: 'Pen' },
              { id: 'rect', icon: Square, label: 'Rectangle' },
              { id: 'text', icon: Type, label: 'Text' }
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  title={t.label}
                  className={`p-2 rounded-lg transition-all ${
                    tool === t.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          {/* Size Selection */}
          <select
            value={size}
            onChange={(e) => setStyle({ size: Number(e.target.value) })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white hover:bg-gray-50 transition-colors"
          >
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}px
              </option>
            ))}
          </select>

          {/* Color Picker */}
          <div className="relative">
            <button
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
              className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:scale-105 transition-transform shadow-sm"
              style={{ backgroundColor: color }}
              title="Choose color"
            >
              <Palette className="w-4 h-4 text-white mx-auto opacity-60" />
            </button>
            {colorPickerOpen && (
              <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-xl p-2 shadow-xl z-10 animate-fadeIn">
                <div className="grid grid-cols-3 gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => {
                        setStyle({ color: c.hex });
                        setColorPickerOpen(false);
                      }}
                      className="w-10 h-10 rounded-lg border-2 hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: c.hex,
                        borderColor: color === c.hex ? '#3b82f6' : '#e5e7eb'
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-700">
            <Users className="w-3.5 h-3.5" />
            <span className="font-semibold">{Object.keys(cursors || {}).length} active</span>
          </div>
          <button
            onClick={downloadCanvas}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={clear}
            className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div ref={containerRef} className="relative bg-gray-50">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="w-full h-[400px] touch-none cursor-crosshair"
        />

        {/* Live Cursors */}
        <div className="pointer-events-none absolute inset-0">
          {Object.entries(cursors || {})
            .filter(([uid]) => uid !== (user?.id || 'me'))
            .map(([uid, c]) => (
              <div
                key={uid}
                className="absolute transition-all duration-75"
                style={{ left: c.x, top: c.y }}
              >
                <div
                  className="w-3 h-3 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: c.color }}
                />
                <div className="mt-1 px-2 py-1 rounded-md bg-black/80 text-white text-[10px] font-medium whitespace-nowrap shadow-lg">
                  {c.name || uid}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
