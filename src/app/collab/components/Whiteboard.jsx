'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useWhiteboard, useParticipants } from '../store/collabStore.jsx';

const COLORS = ['#111827','#ef4444','#10b981','#3b82f6','#a855f7','#f59e0b'];

export default function Whiteboard({ roomId, user }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { ops, cursors, tool, color, size, setTool, setStyle, pushOp, setCursor, clear } = useWhiteboard(roomId, user);
  const { participants } = useParticipants(roomId);
  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState(null);

  const myColor = useMemo(() => COLORS[(user?.id || 'me').length % COLORS.length], [user]);

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

  // Draw ops
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
      .sort((a,b) => a.ts - b.ts)
      .forEach(op => {
        ctx.strokeStyle = op.color || '#111827';
        ctx.fillStyle = op.color || '#111827';
        ctx.lineWidth = op.size || 3;
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
          ctx.font = `${(op.size||16)*4/3}px sans-serif`;
          ctx.fillText(op.text || 'Text', op.x, op.y);
        }
      });
  }, [ops]);

  const onPointerDown = (e) => {
    setDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    setStart({ x, y, points: [{ x, y }] });
  };
  const onPointerMove = (e) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    if (tool === 'pen') {
      setStart(s => ({ ...s, points: [...(s?.points||[]), { x, y }] }));
    }
  };
  const onPointerUp = () => {
    if (!drawing || !start) return setDrawing(false);
    const payload = tool === 'pen'
      ? { type: 'pen', points: start.points }
      : tool === 'rect'
      ? { type: 'rect', x: start.x, y: start.y, w: (start.points?.slice(-1)[0]?.x||start.x) - start.x, h: (start.points?.slice(-1)[0]?.y||start.y) - start.y }
      : { type: 'text', x: start.x, y: start.y, text: 'Hello' };
    pushOp({ id: `op-${Date.now()}`, ...payload, color, size });
    setDrawing(false);
    setStart(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['pen','rect','text'].map(t => (
            <button key={t} onClick={() => setTool(t)} className={`px-2 py-1 text-sm border rounded ${tool===t?'bg-blue-600 text-white':'bg-white'}`}>{t}</button>
          ))}
          <div className="flex items-center gap-2 ml-3">
            <select value={size} onChange={(e)=>setStyle({ size: Number(e.target.value) })} className="border rounded px-2 py-1 text-sm">
              {[2,3,4,6,8].map(s => <option key={s} value={s}>{s}px</option>)}
            </select>
            {COLORS.map(c => (
              <button key={c} onClick={()=>setStyle({ color: c })} className="w-6 h-6 rounded border" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        <button onClick={clear} className="px-2 py-1 text-sm border rounded">Clear</button>
      </div>
      <div ref={containerRef} className="relative">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="w-full h-72 touch-none"
        />
        {/* Presence cursors */}
        <div className="pointer-events-none absolute inset-0">
          {Object.entries(cursors||{}).map(([uid, c]) => (
            <div key={uid} className="absolute -translate-x-1/2 -translate-y-full">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color, position:'absolute', left: c.x, top: c.y }} />
              <div className="text-[10px] px-1 py-0.5 rounded bg-white border" style={{ position:'absolute', left: c.x+6, top: c.y-10 }}>
                {c.name || uid}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
