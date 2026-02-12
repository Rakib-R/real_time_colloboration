"use client";

import { Mark } from '@tiptap/core';
import React, { useRef, useState, useLayoutEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa'

const Ruler = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
    
  const [leftMargin, setLeftMargin] = useState(30);
  const [rightMargin, setRightMargin] = useState(30);

  const [isDraggingLeft, setisDraggingLeft] = useState(false);
  const [isDraggingRight, setisDraggingRight] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setisDraggingLeft(true)
  }
    const handleRightMouseDown = () => {
    setisDraggingRight(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {

    if ((isDraggingLeft || isDraggingRight ) && rulerRef.current){
        const container = rulerRef.current.querySelector("#ruler-container");
        if (container){
            const containerRect = container.getBoundingClientRect();
            const relativeX = e.clientX - containerRect.left;
            const rawPosition = Math.max(0, Math.min(width, relativeX));

            if (isDraggingLeft){
                const maxLeftPosition = width - rightMargin - 100;
                const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
                setLeftMargin(newLeftPosition);

            } else if (isDraggingRight){
                const maxRightPosition = width - leftMargin - 100;
                const newRightPosition = Math.min(rawPosition, maxRightPosition);
                setLeftMargin(newRightPosition);
            }
        }
    }
  }
    const handleMouseUp = () => {
        setisDraggingLeft(false);
        setisDraggingRight(false);
    } 
    const handleLeftDoubleClick = () => {
        setLeftMargin(30)
    }
    const handleRightDoubleClick = () => {
        setRightMargin(30)
    }

  // useLayoutEffect prevents the "flicker" before the browser paints
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setWidth(width);
      }
    };
    // Initialize width on mount
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const spacing = 8; 
  const totalMarkers = Math.floor(width / spacing);
  const markers = Array.from({ length: totalMarkers + 1 }, (_, i) => i);

  return (
    <main 
      id="ruler-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}

      className="relative h-8 border-b border-gray-300 select-none print:hidden flex items-end"
    >
    <Marker
        position={0}
        isLeft={true}
        isDragging={isDraggingLeft}
        onMouseDown={handleLeftMouseDown}
        onDoubleClick={handleLeftDoubleClick}
    />
      {markers.map((marker) => {
        const position = marker * spacing;
        
        return (
          <div
            key={marker}
            className="absolute bottom-0"
            style={{ left: `${position}px` }}
          >

            {/* Major Tick (Inch/CM) */}
            {marker % 10 === 0 && (
              <div className="relative">
                <div className="w-[1px] h-3 bg-neutral-600" />
                <span className="absolute bottom-4 text-sm text-neutral-600 transform -translate-x-1/2 font-mono font-bold">
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

      <Marker 
        position={width - 30}
        isLeft={true}
        isDragging={isDraggingRight}
        onMouseDown={handleRightMouseDown}
        onDoubleClick={handleRightDoubleClick}/>

    </main>
  );
};

interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
}

const Marker = ({
    position,
    isLeft,
    isDragging,
    onMouseDown,
    onDoubleClick,
} : MarkerProps) => {
    
    return ( 
    <div className='absolute group top-0 w-4 h-full cursor-w-resize z-[5]' 
        style={{ [isLeft ? "left" : "right" ] : `${position}px`}}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        >
     <FaCaretDown className='absolute left-1/2 h-full top-0 fill-blue-500 transform -translate-x-1/2'/>
    </div>
    )
}
export default Ruler;