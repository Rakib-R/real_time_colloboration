"use client";

import React, { useRef, useState, useLayoutEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Ruler = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for the container width
  const [width, setWidth] = useState(0);
  
  // State for margins (distance from their respective edges)
  const [leftMargin, setLeftMargin] = useState(30);
  const [rightMargin, setRightMargin] = useState(30);

  // Dragging states
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  // Sync width on mount and on window resize
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [width]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;

      if (isDraggingLeft) {
        // Constrain: Can't go below 0 or past the right marker (minus 30px buffer)
        const newLeft = Math.max(0, Math.min(relativeX, width - rightMargin - 30));
        setLeftMargin(newLeft);
      } else if (isDraggingRight) {
        // Calculate distance from the right wall
        const fromRight = width - relativeX;
        // Constrain: Can't go below 0 or past the left marker (minus 30px buffer)
        const newRight = Math.max(0, Math.min(fromRight, width - leftMargin - 30));
        setRightMargin(newRight);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const spacing = 8; // 8px per tick
  const markers = Array.from({ length: Math.floor(width / spacing) + 1 }, (_, i) => i);

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative h-8 border-b border-gray-300 select-none print:hidden flex items-end w-full bg-white"
    >
      {/* Left Margin Marker */}
      <Marker
        position={leftMargin}
        isLeft={true}
        isDragging={isDraggingLeft}
        onMouseDown={() => setIsDraggingLeft(true)}
        onDoubleClick={() => setLeftMargin(30)}
      />

      {/* Ruler Ticks Container */}
      <div className="absolute inset-0 pointer-events-none h-full">
        {markers.map((marker) => {
          const position = marker * spacing;
          return (
            <div
              key={marker}
              className="absolute bottom-0"
              style={{ left: `${position}px` }}
            >
              {/* Major Tick */}
              {marker % 10 === 0 && (
                <div className="relative">
                  <div className="w-[1px] h-3 bg-neutral-600" />
                  <span className="absolute bottom-4 text-[10px] text-neutral-600 transform -translate-x-1/2 font-mono font-bold">
                    {marker / 10 + 1}
                  </span>
                </div>
              )}

              {/* Half Tick */}
              {marker % 5 === 0 && marker % 10 !== 0 && (
                <div className="w-[1px] h-2 bg-neutral-400" />
              )}

              {/* Small Tick */}
              {marker % 5 !== 0 && (
                <div className="w-[1px] h-1 bg-neutral-300" />
              )}
            </div>
          );
        })}
      </div>

      {/* Right Margin Marker 
          NOTE: We position it relative to the LEFT (width - rightMargin) 
          so it stays synced with ticks during zoom/scaling.
      */}
      <Marker
        position={width - rightMargin}
        isLeft={false}
        isDragging={isDraggingRight}
        onMouseDown={() => setIsDraggingRight(true)}
        onDoubleClick={() => setRightMargin(30)}
      />
    </main>
  );
};

const Marker = ({ 
  position, 
  isLeft, 
  isDragging, 
  onMouseDown, 
  onDoubleClick 
}: MarkerProps) => {
  return (
    <div 
      className="absolute top-0 w-4 h-full cursor-ew-resize z-50 group" 
      style={{ 
        left: `${position}px`, // Always anchor to left for zoom stability
        transform: 'translateX(-50%)' 
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown();
      }}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown 
        className={`h-full w-full ${isDragging ? 'fill-blue-700' : 'fill-blue-500 hover:fill-blue-600'}`} 
      />
      
      {/* Visual Tracking Amount */}
      {isDragging && (
        <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
            {/* If it's the right marker, display the actual margin value, not the left position */}
            {isLeft ? Math.round(position) : "???"}px 
            {/* Note: If you want the right marker tooltip to show the MARGIN, 
                you'd pass the margin value separately or calculate it here. */}
        </div>
      )}

      {/* Visual Guide Line */}
      {isDragging && (
        <div 
          className="absolute left-1/2 w-[1px] h-[100vh] bg-blue-500/30 -translate-x-1/2 pointer-events-none" 
          style={{ top: '100%' }}
        />
      )}
    </div>
  );
};

export default Ruler;