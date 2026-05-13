"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface OrbitalNode {
  id: number;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
  href?: string;
}

interface RadialOrbitalTimelineProps {
  nodes: OrbitalNode[];
  centerLabel?: string;
}

function getNodePosition(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

export function RadialOrbitalTimeline({ nodes, centerLabel = "Codalyte" }: RadialOrbitalTimelineProps) {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [containerSize, setContainerSize] = useState(500);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setContainerSize(Math.min(w, 600));
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const radius = containerSize * 0.35;
  const center = containerSize / 2;

  return (
    <div className="relative w-full py-16" ref={containerRef}>
      <div
        className="relative mx-auto"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Orbit ring */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={containerSize}
          height={containerSize}
        >
          {/* Outer ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(0,229,255,0.1)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          {/* Inner ring */}
          <circle
            cx={center}
            cy={center}
            r={radius * 0.4}
            fill="none"
            stroke="rgba(0,229,255,0.05)"
            strokeWidth="1"
          />
          {/* Connector lines */}
          {nodes.map((node, i) => {
            const pos = getNodePosition(i, nodes.length, radius);
            return (
              <line
                key={node.id}
                x1={center}
                y1={center}
                x2={center + pos.x}
                y2={center + pos.y}
                stroke={hoveredNode === i || activeNode === i ? node.color : "rgba(255,255,255,0.05)"}
                strokeWidth="1"
                strokeDasharray="3 6"
                style={{ transition: "stroke 0.3s" }}
              />
            );
          })}
        </svg>

        {/* Center */}
        <div
          className="absolute flex items-center justify-center rounded-full bg-[#0A0A0A] border border-[#00E5FF]/20 text-center shadow-[0_0_40px_rgba(0,229,255,0.15)]"
          style={{
            left: center - radius * 0.4,
            top: center - radius * 0.4,
            width: radius * 0.8,
            height: radius * 0.8,
          }}
        >
          <span className="text-xs font-bold text-[#00E5FF] leading-tight px-2">
            {centerLabel}
          </span>
        </div>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = getNodePosition(i, nodes.length, radius);
          const nodeSize = 56;
          const isActive = activeNode === i;
          const isHovered = hoveredNode === i;
          const Icon = node.icon;

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center cursor-pointer group"
              style={{
                left: center + pos.x - nodeSize / 2,
                top: center + pos.y - nodeSize / 2,
                width: nodeSize,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveNode(isActive ? null : i)}
              onHoverStart={() => setHoveredNode(i)}
              onHoverEnd={() => setHoveredNode(null)}
            >
              {/* Node circle */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg transition-all duration-300"
                style={{
                  background: isActive || isHovered ? `${node.color}20` : "rgba(10,10,10,0.9)",
                  borderColor: isActive || isHovered ? node.color : "rgba(255,255,255,0.1)",
                  boxShadow: isActive || isHovered ? `0 0 20px ${node.color}40` : "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon className="h-6 w-6" style={{ color: node.color }} />
              </div>

              {/* Label */}
              <span
                className="mt-2 text-center text-xs font-semibold leading-tight whitespace-nowrap"
                style={{ color: isActive || isHovered ? node.color : "rgba(255,255,255,0.6)" }}
              >
                {node.label}
              </span>

              {/* Tooltip */}
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 w-40 rounded-xl border border-white/10 bg-[#0d0d0d] p-3 shadow-2xl"
                    style={{
                      top: nodeSize + 32,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <p className="text-center text-xs text-white/60">{node.description}</p>
                    {node.href && (
                      <a
                        href={node.href}
                        className="mt-2 block text-center text-xs font-medium transition-colors"
                        style={{ color: node.color }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Start Learning →
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
