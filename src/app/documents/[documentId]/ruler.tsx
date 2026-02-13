"use client";

import React, { useRef, useState, useLayoutEffect, useMemo } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const Ruler = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  
  // Margins in pixels (internal state)
  const [leftMargin, setLeftMargin] = useState(56); 
  const [rightMargin, setRightMargin] = useState(56); 

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  // 1. Accurate ResizeObserver using borderBoxSize for zoom-awareness
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        // inlineSize is the most accurate measurement for horizontal zoom
        const newWidth = entry.borderBoxSize[0]?.inlineSize || entry.contentRect.width;
        setWidth(newWidth);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;
      const rawPosition = Math.max(0, Math.min(width, relativeX));

      if (isDraggingLeft) {
        const maxLeft = width - rightMargin - 100;
        setLeftMargin(Math.min(rawPosition, maxLeft));
      } else if (isDraggingRight) {
        const maxRight = width - leftMargin - 100;
        const fromRight = width - rawPosition;
        setRightMargin(Math.max(0, Math.min(fromRight, maxRight)));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  // 2. Memoize markers to prevent re-renders during dragging
  const spacing = 8; 
  const markers = useMemo(() => {
    if (width <= 0) return [];
    return Array.from({ length: Math.floor(width / spacing) + 1 }, (_, i) => i);
  }, [width]);

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      // GPU acceleration prevents line shimmering during zoom
      className="relative flex items-end h-10 py-6 border-b border-gray-300 
                 select-none bg-white transform-gpu will-change-contents"
    >
      {/* Left Marker */}
      <Marker
        position={leftMargin}
        containerWidth={width}
        isLeft={true}
        isDragging={isDraggingLeft}
        onMouseDown={() => setIsDraggingLeft(true)}
      />

      {/* Ticks: Positioned via % to remain scale-locked */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {markers.map((marker) => {
          const posPercent = (marker * spacing / width) * 100;
          if (posPercent > 100) return null;

          return (
            <div 
              key={marker} 
              className="absolute bottom-0 h-full flex flex-col justify-end" 
              style={{ left: `${posPercent}%` }}
            >
              {marker % 10 === 0 ? (
                <div className="flex flex-col items-center -translate-x-1/2">
                  <span className="text-[10px] text-neutral-500 mb-1 font-mono">
                    {marker / 10}
                  </span>
                  <div className="w-[1px] h-3 bg-neutral-600" />
                </div>
              ) : marker % 5 === 0 ? (
                <div className="w-[1px] h-2 bg-neutral-400 -translate-x-1/2" />
              ) : (
                <div className="w-[1px] h-1 bg-neutral-300 -translate-x-1/2" />
              )}
            </div>
          );
        })}
      </div>

      {/* Right Marker */}
      <Marker 
        position={rightMargin}
        containerWidth={width}
        isLeft={false}
        isDragging={isDraggingRight}
        onMouseDown={() => setIsDraggingRight(true)}
      />
    </main>
  );
};

// 3. Marker uses % positioning to stay locked to the "Ticks" grid
const Marker = ({ position, containerWidth, isLeft, isDragging, onMouseDown }: any) => {
  const percent = (position / containerWidth) * 100;

  return (
    <div 
      className="absolute top-0 h-full w-4 cursor-ew-resize z-50 flex flex-col items-center" 
      style={{ 
        [isLeft ? "left" : "right"]: `${percent}%`,
        transform: isLeft ? 'translateX(-50%)' : 'translateX(50%)' 
      }}
      onMouseDown={(e) => { e.preventDefault(); onMouseDown(); }}
    >
      <FaCaretDown className={`h-6 w-6 ${isDragging ? 'fill-blue-600' : 'fill-blue-400 hover:fill-blue-500'}`} />
      {isDragging && (
        <div className="absolute top-6 left-1/2 w-[1px] h-[80vh] bg-blue-500/30 -translate-x-1/2 pointer-events-none" />
      )}
    </div>
  );
};

export default Ruler;