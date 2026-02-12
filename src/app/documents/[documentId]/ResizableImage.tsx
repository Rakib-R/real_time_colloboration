'use client'

import { Node, mergeAttributes } from '@tiptap/core'
import { NodeViewProps, ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import React, { useState, useRef, useEffect } from 'react'

interface ResizableImageOptions {
  inline?: boolean
  allowBase64?: boolean
}

export const ResizableImage = Node.create<ResizableImageOptions>({
  name: 'resizableImage',
  group: 'block',
  inline: false,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: 200 },
      height: { default: 200 },
    }
  },

  parseHTML() {
    return [{ tag: 'img[src]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent)
  },
})

// ------------------------------
// NodeView component
// ------------------------------
const ResizableImageComponent = (props: NodeViewProps) => {
  const { node, updateAttributes } = props
  const [width, setWidth] = useState(node.attrs.width)
  const [height, setHeight] = useState(node.attrs.height)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    updateAttributes({ width, height })
  }, [width, height])

  const startResize = (e: React.MouseEvent, corner: 'br' | 'tl') => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = imgRef.current?.offsetWidth || 200
    const startHeight = imgRef.current?.offsetHeight || 200

    const onMouseMove = (e: MouseEvent) => {
      if (corner === 'br') {
        setWidth(Math.max(50, startWidth + (e.clientX - startX)))
        setHeight(Math.max(50, startHeight + (e.clientY - startY)))
      } else if (corner === 'tl') {
        setWidth(Math.max(50, startWidth - (e.clientX - startX)))
        setHeight(Math.max(50, startHeight - (e.clientY - startY)))
      }
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <NodeViewWrapper className="inline-block relative">
      <img
        ref={imgRef}
        src={node.attrs.src}
        alt={node.attrs.alt}
        title={node.attrs.title}
        width={width}
        height={height}
        className="block"
      />
      {/* Bottom-right handle */}
      <div
        onMouseDown={(e) => startResize(e, 'br')}
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 border-2 border-white cursor-se-resize z-50"
      />
      {/* Top-left handle */}
      <div
        onMouseDown={(e) => startResize(e, 'tl')}
        className="absolute top-0 left-0 w-4 h-4 bg-red-500 border-2 border-white cursor-nw-resize z-50"
      />
    </NodeViewWrapper>
  )
}
