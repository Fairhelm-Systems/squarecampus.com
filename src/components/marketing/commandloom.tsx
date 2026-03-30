"use client";

import { useEffect, useRef, useState, useId } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Clock, Target, TrendingUp, Users, Zap } from "@/components/icons";
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// COMMAND_LOOM LOGO COMPONENT
// ============================================================================

interface CommandLoomLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const CommandLoomLogo = ({ className = "", size = "md", animate = true }: CommandLoomLogoProps) => {
  const uid = useId();

  const sizeMap = {
    sm: { width: 20, height: 20, nodeR: 2.5, centerR: 4 },
    md: { width: 32, height: 32, nodeR: 3.5, centerR: 6 },
    lg: { width: 48, height: 48, nodeR: 5, centerR: 8 },
  } as const;

  const { width, height, nodeR, centerR } = sizeMap[size];
  const cx = width / 2;
  const cy = height / 2;

  const orbitRadius = width * 0.32;

  const colors = {
    blue: "#3b82f6",
    purple: "#8b5cf6",
    emerald: "#10b981",
  } as const;

  const nodes = [
    { angle: 0, color: colors.blue },
    { angle: 72, color: colors.purple },
    { angle: 144, color: colors.emerald },
    { angle: 216, color: colors.blue },
    { angle: 288, color: colors.purple },
  ].map((n, i) => ({
    ...n,
    x: cx + Math.cos((n.angle * Math.PI) / 180) * orbitRadius,
    y: cy + Math.sin((n.angle * Math.PI) / 180) * orbitRadius,
    delay: i * 0.15,
  }));

  const glowId = `commandloomGlow-${uid}`;
  const centerGradId = `centerGrad-${uid}`;
  const pulseGradId = `pulseGrad-${uid}`;

  return (
    <svg
      className={`commandloom-logo ${className}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CommandLoom"
      role="img"
    >
      <defs>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id={centerGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.blue} />
          <stop offset="50%" stopColor={colors.purple} />
          <stop offset="100%" stopColor={colors.emerald} />
        </radialGradient>

        <radialGradient id={pulseGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.blue} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors.blue} stopOpacity="0" />
        </radialGradient>
      </defs>

      {nodes.map((node, i) => (
        <line
          key={`line-${i}`}
          x1={cx}
          y1={cy}
          x2={node.x}
          y2={node.y}
          stroke={`url(#${centerGradId})`}
          strokeWidth={size === "sm" ? 0.5 : 1}
          strokeOpacity={0.4}
          className={animate ? "commandloom-logo-line" : ""}
          style={animate ? { animationDelay: `${node.delay}s` } : undefined}
        />
      ))}

      {animate && (
        <circle
          cx={cx}
          cy={cy}
          r={orbitRadius + nodeR}
          fill="none"
          stroke={`url(#${centerGradId})`}
          strokeWidth={0.5}
          strokeOpacity={0.2}
          className="commandloom-logo-ring"
        />
      )}

      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          <circle
            cx={node.x}
            cy={node.y}
            r={nodeR * 1.5}
            fill={node.color}
            opacity={0.2}
            className={animate ? "commandloom-logo-node-glow" : ""}
            style={animate ? { animationDelay: `${node.delay}s` } : undefined}
          />
          <circle
            cx={node.x}
            cy={node.y}
            r={nodeR}
            fill={node.color}
            filter={`url(#${glowId})`}
            className={animate ? "commandloom-logo-node" : ""}
            style={animate ? { animationDelay: `${node.delay}s` } : undefined}
          />
        </g>
      ))}

      {animate && (
        <circle
          cx={cx}
          cy={cy}
          r={centerR * 1.8}
          fill={`url(#${pulseGradId})`}
          className="commandloom-logo-pulse"
        />
      )}

      <circle
        cx={cx}
        cy={cy}
        r={centerR}
        fill={`url(#${centerGradId})`}
        filter={`url(#${glowId})`}
      />

      <circle
        cx={cx - centerR * 0.2}
        cy={cy - centerR * 0.2}
        r={centerR * 0.4}
        fill="white"
        opacity={0.3}
      />
    </svg>
  );
};

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface DataPoint {
  id: number;
  x: number;
  y: number;
  category: "attendance" | "grades" | "behavior" | "neutral";
  value: number;
}

interface NeuralNode {
  id: string;
  x: number;
  y: number;
  layer: number;
}

interface NeuralConnection {
  from: string;
  to: string;
}

// ============================================================================
// FLOATING PARTICLES BACKGROUND
// ============================================================================

const FloatingParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animation: `commandloom-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes commandloom-float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          25% {
            transform: translate(30px, -40px) scale(1.2);
            opacity: 0.4;
          }
          50% {
            transform: translate(-20px, -80px) scale(0.8);
            opacity: 0.2;
          }
          75% {
            transform: translate(40px, -40px) scale(1.1);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// NEURAL NETWORK SVG VISUALIZATION
// ============================================================================

const NeuralNetworkViz = ({ className = "" }: { className?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Generate nodes for 4 layers
  const layers = [3, 5, 5, 3];
  const nodes: NeuralNode[] = [];
  const connections: NeuralConnection[] = [];

  layers.forEach((count, layerIndex) => {
    const layerX = 80 + layerIndex * 120;
    const startY = (300 - count * 50) / 2;

    for (let i = 0; i < count; i++) {
      const nodeId = `node-${layerIndex}-${i}`;
      nodes.push({
        id: nodeId,
        x: layerX,
        y: startY + i * 50 + 25,
        layer: layerIndex,
      });

      // Connect to previous layer
      if (layerIndex > 0) {
        const prevLayerCount = layers[layerIndex - 1];
        for (let j = 0; j < prevLayerCount; j++) {
          connections.push({
            from: `node-${layerIndex - 1}-${j}`,
            to: nodeId,
          });
        }
      }
    }
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate connections appearing
      const paths = svgRef.current?.querySelectorAll(".neural-connection");
      paths?.forEach((path, index) => {
        gsap.fromTo(
          path,
          { strokeDashoffset: 200, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 0.4,
            duration: 1.5,
            delay: index * 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: svgRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Pulse animation on nodes
      const nodeElements = svgRef.current?.querySelectorAll(".neural-node");
      nodeElements?.forEach((node, index) => {
        gsap.to(node, {
          scale: 1.3,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.05,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Full path data flow animation - pulses travel through ALL layers
      const createDataPulse = (startNodeIndex: number) => {
        const svg = svgRef.current;
        if (!svg) return;

        // Build a path from input through all layers to output
        const path: NeuralNode[] = [];

        // Start from specific input node
        const inputNode = nodes.find((n) => n.id === `node-0-${startNodeIndex}`);
        if (!inputNode) return;
        path.push(inputNode);

        // For each subsequent layer, pick a random connected node
        for (let layer = 1; layer < layers.length; layer++) {
          const layerNodes = nodes.filter((n) => n.layer === layer);
          const nextNode = layerNodes[Math.floor(Math.random() * layerNodes.length)];
          path.push(nextNode);
        }

        // Animate pulse along the path
        const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        pulse.setAttribute("r", "4");
        pulse.setAttribute("fill", "#3b82f6");
        pulse.setAttribute("filter", "url(#glow)");
        svg.appendChild(pulse);

        // Create timeline for this pulse
        const pulseTl = gsap.timeline({
          onComplete: () => pulse.remove(),
        });

        // Animate through each segment of the path
        path.forEach((node, idx) => {
          if (idx === 0) {
            pulseTl.set(pulse, { attr: { cx: node.x, cy: node.y } });
          } else {
            // Color changes as it progresses
            const colors = ["#3b82f6", "#8b5cf6", "#a855f7", "#10b981"];
            pulseTl.to(pulse, {
              attr: { cx: node.x, cy: node.y, fill: colors[idx] || "#10b981" },
              duration: 0.35,
              ease: "power2.inOut",
            });
          }
        });

        // Fade out at the end
        pulseTl.to(pulse, {
          opacity: 0,
          scale: 1.5,
          duration: 0.2,
        });
      };

      // Create repeating data flow
      let flowInterval: ReturnType<typeof setInterval>;

      ScrollTrigger.create({
        trigger: svgRef.current,
        start: "top 80%",
        onEnter: () => {
          // Start after initial animation
          setTimeout(() => {
            // Initial burst of pulses
            createDataPulse(0);
            setTimeout(() => createDataPulse(1), 200);
            setTimeout(() => createDataPulse(2), 400);

            // Then continuous flow
            flowInterval = setInterval(() => {
              const startNode = Math.floor(Math.random() * layers[0]);
              createDataPulse(startNode);
            }, 800);
          }, 2000);
        },
        onLeave: () => {
          if (flowInterval) clearInterval(flowInterval);
        },
        onEnterBack: () => {
          flowInterval = setInterval(() => {
            const startNode = Math.floor(Math.random() * layers[0]);
            createDataPulse(startNode);
          }, 800);
        },
        onLeaveBack: () => {
          if (flowInterval) clearInterval(flowInterval);
        },
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 560 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Connections */}
      {connections.map((conn, i) => {
        const fromNode = nodes.find((n) => n.id === conn.from);
        const toNode = nodes.find((n) => n.id === conn.to);
        if (!fromNode || !toNode) return null;

        return (
          <line
            key={i}
            className="neural-connection"
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="url(#connectionGrad)"
            strokeWidth="1"
            strokeDasharray="200"
            strokeDashoffset="200"
            opacity="0"
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id} className="neural-node" style={{ opacity: 0.3 }}>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.layer === 0 || node.layer === 3 ? 10 : 8}
            fill={node.layer === 0 ? "#3b82f6" : node.layer === 3 ? "#10b981" : "#8b5cf6"}
            filter="url(#glow)"
          />
          <circle
            cx={node.x}
            cy={node.y}
            r={node.layer === 0 || node.layer === 3 ? 14 : 12}
            fill="none"
            stroke={node.layer === 0 ? "#3b82f6" : node.layer === 3 ? "#10b981" : "#8b5cf6"}
            strokeWidth="1"
            opacity="0.3"
          />
        </g>
      ))}

      {/* Layer labels */}
      <text x="80" y="290" fill="#64748b" fontSize="10" textAnchor="middle">
        Input
      </text>
      <text x="200" y="290" fill="#64748b" fontSize="10" textAnchor="middle">
        Analysis
      </text>
      <text x="320" y="290" fill="#64748b" fontSize="10" textAnchor="middle">
        Pattern
      </text>
      <text x="440" y="290" fill="#64748b" fontSize="10" textAnchor="middle">
        Insight
      </text>
    </svg>
  );
};

// ============================================================================
// PATTERN EMERGENCE VISUALIZATION
// ============================================================================

const PatternEmergence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Generate scattered data points
  const dataPoints: DataPoint[] = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    category: "neutral" as const,
    value: Math.random() * 100,
  }));

  // Cluster positions for each category
  const clusters = {
    attendance: { x: 20, y: 25 },
    grades: { x: 50, y: 75 },
    behavior: { x: 80, y: 35 },
  };

  const categoryColors = {
    attendance: "#f59e0b",
    grades: "#3b82f6",
    behavior: "#8b5cf6",
    neutral: "#64748b",
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        onEnter: () => {
          if (analysisComplete) return;

          setIsAnalyzing(true);

          // Phase 1: Pulse effect
          gsap.to(".pattern-dot", {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.3,
            stagger: 0.01,
            ease: "power2.out",
          });

          // Phase 2: Cluster by category after delay
          setTimeout(() => {
            const dots = containerRef.current?.querySelectorAll(".pattern-dot");
            const categoryCounters = { attendance: 0, grades: 0, behavior: 0 };

            dots?.forEach((dot, i) => {
              const categories = ["attendance", "grades", "behavior"] as const;
              const category = categories[i % 3];
              const cluster = clusters[category];
              const indexInCluster = categoryCounters[category]++;

              // Arrange in tight concentric circles
              const ring = Math.floor(indexInCluster / 8); // 8 dots per ring
              const positionInRing = indexInCluster % 8;
              const angle = (positionInRing / 8) * Math.PI * 2 + ring * 0.3;
              const radius = 3 + ring * 3.5; // Tighter rings

              const targetX = cluster.x + Math.cos(angle) * radius;
              const targetY = cluster.y + Math.sin(angle) * radius;

              gsap.to(dot, {
                left: `${targetX}%`,
                top: `${targetY}%`,
                backgroundColor: categoryColors[category],
                scale: 1,
                duration: 1.2,
                delay: i * 0.015,
                ease: "elastic.out(1, 0.5)",
              });
            });

            // Show labels
            gsap.to(".cluster-label", {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 1,
              stagger: 0.1,
              ease: "power2.out",
            });

            setTimeout(() => {
              setIsAnalyzing(false);
              setAnalysisComplete(true);
            }, 1500);
          }, 800);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [analysisComplete]);

  return (
    <div ref={containerRef} className="relative h-80 w-full">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Data points */}
      {dataPoints.map((point) => (
        <div
          key={point.id}
          className="pattern-dot absolute h-2 w-2 rounded-full transition-colors"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            backgroundColor: categoryColors.neutral,
            boxShadow: "0 0 6px currentColor",
          }}
        />
      ))}

      {/* Cluster labels */}
      <div
        className="cluster-label absolute left-[20%] top-[10%] -translate-x-1/2 translate-y-4 opacity-0"
        style={{ color: categoryColors.attendance }}
      >
        <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold">
          <Clock className="h-3 w-3" />
          Attendance Risk
        </div>
      </div>
      <div
        className="cluster-label absolute left-[50%] top-[60%] -translate-x-1/2 translate-y-4 opacity-0"
        style={{ color: categoryColors.grades }}
      >
        <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold">
          <TrendingUp className="h-3 w-3" />
          Grade Decline
        </div>
      </div>
      <div
        className="cluster-label absolute left-[80%] top-[20%] -translate-x-1/2 translate-y-4 opacity-0"
        style={{ color: categoryColors.behavior }}
      >
        <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold">
          <Users className="h-3 w-3" />
          Behavior Pattern
        </div>
      </div>

      {/* Analysis indicator */}
      {isAnalyzing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-full border border-blue-500/30 bg-black/80 px-6 py-3 backdrop-blur-sm">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <span className="text-sm font-medium text-blue-400">CommandLoom analyzing patterns...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SPEED COMPARISON COMPONENT
// ============================================================================

const SpeedComparison = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const [traditionalTime, setTraditionalTime] = useState(0);
  const [commandloomTime, setCommandLoomTime] = useState(0);
  const [traditionalBarWidth, setTraditionalBarWidth] = useState(0);
  const [commandloomBarWidth, setCommandLoomBarWidth] = useState(0);
  const [isRacing, setIsRacing] = useState(false);
  const [raceComplete, setRaceComplete] = useState(false);

  // Final values - more realistic
  const TRADITIONAL_FINAL = 27; // minutes
  const COMMAND_LOOM_FINAL = 1.2; // seconds

  useEffect(() => {
    if (!containerRef.current || hasAnimatedRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        once: true, // Only trigger once
        onEnter: () => {
          hasAnimatedRef.current = true;
          setIsRacing(true);

          if (prefersReducedMotion) {
            setCommandLoomTime(COMMAND_LOOM_FINAL);
            setCommandLoomBarWidth(100);
            setTraditionalTime(TRADITIONAL_FINAL);
            setTraditionalBarWidth(100);
            setIsRacing(false);
            setRaceComplete(true);
            return;
          }

          // CommandLoom - instant burst
          gsap.to(
            { val: 0, bar: 0 },
            {
              val: COMMAND_LOOM_FINAL,
              bar: 100,
              duration: 0.5,
              ease: "power4.out",
              onUpdate: function () {
                const target = this.targets()[0];
                setCommandLoomTime(Number(target.val.toFixed(1)));
                setCommandLoomBarWidth(target.bar);
              },
            }
          );

          // Traditional - slow crawl
          gsap.to(
            { val: 0, bar: 0 },
            {
              val: TRADITIONAL_FINAL,
              bar: 100,
              duration: 3.5,
              ease: "power1.inOut",
              onUpdate: function () {
                const target = this.targets()[0];
                setTraditionalTime(Math.round(target.val));
                setTraditionalBarWidth(target.bar);
              },
              onComplete: () => {
                setIsRacing(false);
                setRaceComplete(true);
              },
            }
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:grid-cols-2"
    >
      {/* Traditional */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-400">Traditional Reports</span>
          <span className="font-mono text-2xl font-bold text-red-400">
            {traditionalTime}
            <span className="text-sm text-neutral-500"> min</span>
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-neutral-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-100"
            style={{
              width: `${traditionalBarWidth}%`,
              boxShadow: isRacing ? "0 0 20px rgba(239, 68, 68, 0.5)" : "none",
            }}
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          {!raceComplete ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-600 border-t-neutral-400" />
              Querying database... Generating Excel... Formatting...
            </>
          ) : (
            <>
              <Clock className="h-4 w-4" />
              Manual process with multiple handoffs
            </>
          )}
        </div>
      </div>

      {/* CommandLoom */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-400">CommandLoom Intelligence</span>
          <span className="font-mono text-2xl font-bold text-emerald-400">
            {commandloomTime}
            <span className="text-sm text-neutral-500"> sec</span>
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-neutral-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-blue-500 to-purple-500 transition-all duration-100"
            style={{
              width: `${commandloomBarWidth}%`,
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
            }}
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <Zap className="h-4 w-4" />
          {raceComplete ? "Analysis complete" : "Instant insight delivery"}
        </div>
      </div>

      {/* Comparison badge */}
      {raceComplete && (
        <div className="col-span-full mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
            <CommandLoomLogo size="sm" />
            1,350x faster than traditional methods
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// ASK COMMAND_LOOM INTERACTIVE DEMO
// ============================================================================

const sampleQueries = [
  {
    question: "Which students are at risk of failing this semester?",
    summary: "23 students showing early warning signs",
    context: "Based on analysis of 1,247 student records across 3 campuses",
    details: [
      { label: "Attendance < 75%", value: 12, max: 15, color: "#f59e0b" },
      { label: "Grade decline > 15%", value: 8, max: 15, color: "#3b82f6" },
      { label: "Both factors", value: 3, max: 15, color: "#ef4444" },
    ],
    recommendation: "Schedule parent-teacher meetings for high-risk group within 2 weeks",
  },
  {
    question: "Show me attendance patterns for Class 10",
    summary: "Monday mornings show 18% lower attendance",
    context: "Pattern detected across 4 sections over last 3 months",
    details: [
      { label: "Monday 1st period", value: 72, max: 100, color: "#ef4444" },
      { label: "Rest of week avg", value: 91, max: 100, color: "#10b981" },
      { label: "Friday last period", value: 84, max: 100, color: "#f59e0b" },
    ],
    recommendation: "Reschedule key subjects away from Monday first period",
  },
  {
    question: "What's driving the fee collection delay?",
    summary: "67% of delays traced to 3 root causes",
    context: "Analyzed 892 pending transactions from current quarter",
    details: [
      { label: "Payment gateway fails", value: 34, max: 50, color: "#ef4444" },
      { label: "Incorrect reminders", value: 21, max: 50, color: "#f59e0b" },
      { label: "Disputed amounts", value: 12, max: 50, color: "#8b5cf6" },
    ],
    recommendation: "Switch payment gateway for HDFC cards; fix reminder cadence",
  },
  {
    question: "Predict next month's transport utilization",
    summary: "Expected 12% increase in Route 4 demand",
    context: "Factoring new admissions and seasonal patterns",
    details: [
      { label: "Route 4 (Sector 62)", value: 94, max: 100, color: "#ef4444" },
      { label: "Route 2 (DLF Phase)", value: 78, max: 100, color: "#10b981" },
      { label: "Route 7 (Noida)", value: 82, max: 100, color: "#f59e0b" },
    ],
    recommendation: "Add vehicle to Route 4; redistribute 8 students from Route 2",
  },
  {
    question: "Which teachers have the highest student satisfaction?",
    summary: "Top 5 teachers identified across departments",
    context: "Based on 2,340 student feedback responses this semester",
    details: [
      { label: "Ms. Sharma (Math)", value: 94, max: 100, color: "#10b981" },
      { label: "Mr. Verma (Science)", value: 91, max: 100, color: "#10b981" },
      { label: "Department avg", value: 78, max: 100, color: "#f59e0b" },
    ],
    recommendation: "Pair top performers with newer teachers for mentorship",
  },
  {
    question: "How is our library utilization trending?",
    summary: "Digital resources up 34%, physical visits down 12%",
    context: "Comparing current quarter to same period last year",
    details: [
      { label: "E-book checkouts", value: 87, max: 100, color: "#10b981" },
      { label: "Physical visits", value: 58, max: 100, color: "#f59e0b" },
      { label: "Study room booking", value: 92, max: 100, color: "#3b82f6" },
    ],
    recommendation: "Expand digital catalog; convert underused stacks to study pods",
  },
];

const AskCommandLoomDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "thinking" | "result">("idle");
  const [showChart, setShowChart] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentData = sampleQueries[currentIndex];

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayedQuestion(currentData.question);
      setPhase("result");
      setShowChart(true);
      return;
    }

    // Start typing phase
    setPhase("typing");
    setDisplayedQuestion("");
    setShowChart(false);

    let charIndex = 0;
    const question = currentData.question;

    const typeInterval = setInterval(() => {
      if (charIndex < question.length) {
        setDisplayedQuestion(question.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Thinking phase (400ms shimmer)
        setPhase("thinking");

        timeoutRef.current = setTimeout(() => {
          // Result phase
          setPhase("result");

          // Animate chart bars after a brief delay
          timeoutRef.current = setTimeout(() => {
            setShowChart(true);

            // Hold result for 4 seconds, then move to next question
            timeoutRef.current = setTimeout(() => {
              setCurrentIndex((prev) => (prev + 1) % sampleQueries.length);
            }, 4000);
          }, 200);
        }, 400);
      }
    }, 35);

    return () => {
      clearInterval(typeInterval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isInView, currentData.question]);

  // ScrollTrigger to start animation when in view
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        onEnter: () => setIsInView(true),
        onLeave: () => setIsInView(false),
        onEnterBack: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Input area */}
      <div className="relative">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-xl" />
        <div className="relative overflow-hidden rounded-xl border border-white/[0.12] bg-neutral-900/80 p-4 backdrop-blur-sm">
          {/* Shimmer overlay during thinking phase */}
          {phase === "thinking" && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ animationDuration: "1s" }}
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                phase === "thinking"
                  ? "animate-pulse bg-gradient-to-br from-blue-400/20 to-purple-500/20"
                  : "bg-gradient-to-br from-blue-500/10 to-purple-600/10"
              }`}
            >
              <CommandLoomLogo size="md" animate={phase === "thinking"} />
            </div>
            <div className="flex-1 min-h-[28px]">
              <span className="text-lg text-white">
                {displayedQuestion || (
                  <span className="text-neutral-500">
                    Ask CommandLoom anything about your institution...
                  </span>
                )}
              </span>
            </div>
            {phase === "typing" && <div className="h-5 w-0.5 animate-pulse bg-blue-400" />}
            {phase === "thinking" && (
              <div className="flex items-center gap-1">
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-purple-400"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-emerald-400"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Response area */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          phase === "result" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
          {/* Summary */}
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
              <Target className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white">{currentData.summary}</p>
              <p className="mt-1 text-sm text-neutral-400">{currentData.context}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-6 space-y-3">
            {currentData.details.map((item, i) => (
              <div key={`${currentIndex}-${i}`} className="flex items-center gap-4">
                <span className="w-40 shrink-0 text-sm text-neutral-400">{item.label}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-full bg-neutral-800">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: showChart ? `${(item.value / item.max) * 100}%` : "0%",
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}`,
                      transitionDelay: `${i * 150}ms`,
                    }}
                  />
                </div>
                <span
                  className="w-12 text-right font-mono text-sm font-semibold"
                  style={{ color: item.color }}
                >
                  {item.value}
                  {item.max === 100 ? "%" : ""}
                </span>
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
              <Zap className="h-4 w-4" />
              CommandLoom Recommendation
            </div>
            <p className="mt-2 text-sm text-neutral-300">{currentData.recommendation}</p>
          </div>

          {/* Progress indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {sampleQueries.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-6 bg-blue-500" : "w-1.5 bg-neutral-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Shimmer animation style */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ROOT CAUSE SYNTHESIS - DATA SOURCES CONVERGING TO INSIGHT
// ============================================================================

const RootCauseSynthesis = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const dataSources = [
    { label: "Attendance", value: "76%", color: "#f59e0b", icon: Clock },
    { label: "Grades", value: "-18%", color: "#3b82f6", icon: TrendingUp },
    { label: "Behavior", value: "3.2x", color: "#8b5cf6", icon: Users },
  ];

  const rootCause = {
    title: "Transportation Disruption",
    confidence: 87,
    detail: "Route 4 delays correlating with Monday absences",
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        onEnter: () => {
          if (isAnimated) return;

          if (prefersReducedMotion) {
            setIsAnimated(true);
            return;
          }

          // Animate data sources
          gsap.from(".data-source", {
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          });

          // Animate connecting lines
          gsap.from(".connect-line", {
            scaleX: 0,
            duration: 0.8,
            delay: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            transformOrigin: "left center",
          });

          // Animate center node
          gsap.from(".synthesis-node", {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            delay: 1,
            ease: "back.out(1.5)",
          });

          // Animate result
          gsap.from(".synthesis-result", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 1.3,
            ease: "power3.out",
            onComplete: () => setIsAnimated(true),
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isAnimated]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
        {/* Data sources */}
        <div className="flex flex-1 flex-col gap-3">
          {dataSources.map((source, i) => {
            const Icon = source.icon;
            return (
              <div key={i} className="data-source flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${source.color}20` }}
                >
                  <Icon className="h-5 w-5" style={{ color: source.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-400">{source.label}</div>
                  <div className="text-lg font-bold" style={{ color: source.color }}>
                    {source.value}
                  </div>
                </div>
                <div
                  className="connect-line hidden h-0.5 w-12 lg:block"
                  style={{ backgroundColor: `${source.color}40` }}
                />
              </div>
            );
          })}
        </div>

        {/* Synthesis node */}
        <div className="synthesis-node relative flex h-20 w-20 shrink-0 items-center justify-center self-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-500/20" />
          <div className="absolute inset-2 rounded-full bg-emerald-500/30" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600">
            <Target className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Result */}
        <div className="synthesis-result flex-1">
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
            Root Cause Identified
          </div>
          <div className="mb-2 text-xl font-bold text-white">{rootCause.title}</div>
          <div className="mb-3 text-sm text-neutral-400">{rootCause.detail}</div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
            <span className="font-mono">{rootCause.confidence}%</span>
            <span className="text-emerald-400/60">confidence</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PREDICTIVE TIMELINE
// ============================================================================

const PredictiveTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const timelineData = [
    { month: "Sep", value: 82, type: "past" },
    { month: "Oct", value: 78, type: "past" },
    { month: "Nov", value: 74, type: "past" },
    { month: "Dec", value: 71, type: "current" },
    { month: "Jan", value: 68, type: "predicted" },
    { month: "Feb", value: 65, type: "predicted" },
    { month: "Mar", value: 70, type: "predicted", intervention: true },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(
        { val: 0 },
        {
          val: 100,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function () {
            setProgress(this.targets()[0].val);
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Chart */}
      <div className="relative h-48">
        <svg className="h-full w-full" viewBox="0 0 700 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="50"
              y1={40 + i * 35}
              x2="650"
              y2={40 + i * 35}
              stroke="#374151"
              strokeDasharray="4 4"
              opacity="0.3"
            />
          ))}

          {/* Confidence band for predictions */}
          <path
            d={`
              M ${350} ${200 - (68 / 100) * 160 - 20}
              L ${450} ${200 - (65 / 100) * 160 - 25}
              L ${550} ${200 - (70 / 100) * 160 - 15}
              L ${550} ${200 - (70 / 100) * 160 + 15}
              L ${450} ${200 - (65 / 100) * 160 + 25}
              L ${350} ${200 - (68 / 100) * 160 + 20}
              Z
            `}
            fill="url(#confidenceBand)"
            opacity={progress / 100}
          />

          {/* Past line (solid) */}
          <path
            d={`
              M 50 ${200 - (82 / 100) * 160}
              L 150 ${200 - (78 / 100) * 160}
              L 250 ${200 - (74 / 100) * 160}
              L 350 ${200 - (71 / 100) * 160}
            `}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset={400 - (progress / 100) * 400}
          />

          {/* Prediction line (dashed) */}
          <path
            d={`
              M 350 ${200 - (71 / 100) * 160}
              L 450 ${200 - (68 / 100) * 160}
              L 550 ${200 - (65 / 100) * 160}
              L 650 ${200 - (70 / 100) * 160}
            `}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 4"
            opacity={progress / 100}
          />

          {/* Data points */}
          {timelineData.map((point, i) => {
            const x = 50 + i * 100;
            const y = 200 - (point.value / 100) * 160;
            const show = progress > i * 14;

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={show ? 6 : 0}
                  fill={point.type === "predicted" ? "#10b981" : "#3b82f6"}
                  style={{ transition: "r 0.3s ease-out" }}
                />
                {point.intervention && show && (
                  <g>
                    <circle cx={x} cy={y} r="12" fill="#10b981" opacity="0.3" />
                    <text
                      x={x}
                      y={y - 20}
                      textAnchor="middle"
                      fill="#10b981"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      Intervention
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* X-axis labels */}
          {timelineData.map((point, i) => (
            <text
              key={i}
              x={50 + i * 100}
              y="195"
              textAnchor="middle"
              fill={point.type === "predicted" ? "#10b981" : "#64748b"}
              fontSize="11"
            >
              {point.month}
            </text>
          ))}

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="confidenceBand" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-6 rounded-full bg-blue-500" />
          <span className="text-neutral-400">Historical data</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-0.5 w-6 rounded-full bg-emerald-500"
            style={{
              background:
                "repeating-linear-gradient(90deg, #10b981, #10b981 4px, transparent 4px, transparent 8px)",
            }}
          />
          <span className="text-neutral-400">AI prediction</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-6 rounded bg-emerald-500/20" />
          <span className="text-neutral-400">Confidence interval</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CAPABILITY CARDS
// ============================================================================

const capabilities = [
  {
    icon: Zap,
    title: "Instant Insights",
    description:
      "Natural language queries return actionable intelligence in under a second. No SQL, no waiting.",
    gradient: "from-amber-500 to-orange-600",
    metric: "0.3s",
    metricLabel: "avg response",
  },
  {
    icon: Target,
    title: "Predictive Power",
    description:
      "Identify at-risk students before problems escalate. Early intervention powered by pattern recognition.",
    gradient: "from-blue-500 to-cyan-500",
    metric: "3 weeks",
    metricLabel: "early warning",
  },
  {
    icon: BarChart3,
    title: "Cross-Domain Analysis",
    description:
      "Connect attendance, grades, behavior, and finance to surface root causes invisible to siloed reports.",
    gradient: "from-purple-500 to-pink-500",
    metric: "5 sources",
    metricLabel: "unified view",
  },
];

// ============================================================================
// MAIN COMMAND_LOOM COMPONENT
// ============================================================================

export default function CommandLoom() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile, shouldReduceEffects } = useDeviceCapabilities();

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || shouldReduceEffects) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".commandloom-hero",
          start: "top 85%",
          once: true,
        },
      });

      heroTl
        .from(".commandloom-badge", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".commandloom-title",
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".commandloom-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Capability cards stagger
      gsap.fromTo(
        ".capability-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Section titles
      gsap.utils.toArray(".section-title").forEach((el) => {
        gsap.fromTo(
          el as Element,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // Parallax on neural network
      gsap.to(".neural-parallax", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".neural-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceEffects]);

  return (
    <section
      ref={sectionRef}
      id="commandloom"
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Background elements - Hidden on mobile/low-end for performance */}
      {!isMobile && <FloatingParticles />}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* HERO SECTION */}
        {/* ============================================================ */}
        <div className="commandloom-hero mb-20 text-center md:mb-28">
          <div className="commandloom-badge mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
            <CommandLoomLogo size="sm" />
            Introducing CommandLoom
          </div>

          <h2 className="commandloom-title mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Your institution's{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              intelligence layer
            </span>
          </h2>

          <p className="commandloom-subtitle mx-auto max-w-3xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            CommandLoom transforms your scattered data into instant, actionable insights. Ask questions in
            plain language. Get answers in milliseconds. See problems before they happen.
          </p>
        </div>

        {/* ============================================================ */}
        {/* ASK COMMAND_LOOM DEMO */}
        {/* ============================================================ */}
        <div className="mb-24 md:mb-32">
          <div className="section-title mb-8 text-center">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Natural Language Interface
            </h3>
            <p className="text-2xl font-bold text-white md:text-3xl">
              Just ask. CommandLoom understands.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <AskCommandLoomDemo />
          </div>
        </div>

        {/* ============================================================ */}
        {/* NEURAL NETWORK VISUALIZATION - Hidden on mobile for performance */}
        {/* ============================================================ */}
        {!isMobile && (
          <div className="neural-section mb-16 md:mb-20">
            <div className="section-title mb-6 text-center">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
                Deep Pattern Recognition
              </h3>
              <p className="text-2xl font-bold text-white md:text-3xl">
                AI that sees what spreadsheets miss
              </p>
            </div>
            <div className="neural-parallax mx-auto max-w-2xl">
              <NeuralNetworkViz className="h-auto w-full" />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CAPABILITY CARDS */}
        {/* ============================================================ */}
        <div className="capabilities-grid mb-12 grid gap-6 md:mb-24 md:grid-cols-3">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="capability-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
              />

              <div className="relative">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cap.gradient}`}
                >
                  <cap.icon className="h-6 w-6 text-white" />
                </div>

                <h4 className="mb-2 text-lg font-semibold text-white">{cap.title}</h4>
                <p className="mb-4 text-sm leading-relaxed text-neutral-400">{cap.description}</p>

                <div className="flex items-baseline gap-2">
                  <span
                    className={`bg-gradient-to-r ${cap.gradient} bg-clip-text text-2xl font-bold text-transparent`}
                  >
                    {cap.metric}
                  </span>
                  <span className="text-xs text-neutral-500">{cap.metricLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* PATTERN EMERGENCE - Hidden on mobile for performance (60 dots) */}
        {/* ============================================================ */}
        {!isMobile && (
          <div className="mb-24 md:mb-32">
            <div className="section-title mb-8 text-center">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
                Pattern Discovery
              </h3>
              <p className="text-2xl font-bold text-white md:text-3xl">
                From chaos to clarity in seconds
              </p>
            </div>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <PatternEmergence />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ROOT CAUSE SYNTHESIS */}
        {/* ============================================================ */}
        <div className="mb-20 md:mb-24">
          <div className="section-title mb-6 text-center">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
              Multi-Source Intelligence
            </h3>
            <p className="text-2xl font-bold text-white md:text-3xl">
              Every signal, one root cause
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <RootCauseSynthesis />
          </div>
        </div>

        {/* ============================================================ */}
        {/* PREDICTIVE TIMELINE */}
        {/* ============================================================ */}
        <div className="mb-20 md:mb-24">
          <div className="section-title mb-6 text-center">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Predictive Analytics
            </h3>
            <p className="text-2xl font-bold text-white md:text-3xl">See ahead, act now</p>
          </div>
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
            <PredictiveTimeline />
          </div>
        </div>

        {/* ============================================================ */}
        {/* SPEED COMPARISON */}
        {/* ============================================================ */}
        <div className="mb-24 md:mb-32">
          <div className="section-title mb-8 text-center">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Speed Matters
            </h3>
            <p className="text-2xl font-bold text-white md:text-3xl">
              The time to insight, transformed
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <SpeedComparison />
          </div>
        </div>

        {/* ============================================================ */}
        {/* CTA */}
        {/* ============================================================ */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 p-8 text-center backdrop-blur-sm md:p-12">
          {/* Animated border */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl">
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
                animation: "border-flow 3s linear infinite",
              }}
            />
          </div>

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400">
              <CommandLoomLogo size="sm" />
              Available with SquareCampus
            </div>

            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to see CommandLoom in action?
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-neutral-400">
              Book a demo and watch CommandLoom analyze your institution's data in real-time. See insights
              you've been missing.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-neutral-900 transition-all duration-300 hover:bg-neutral-200"
              >
                Book a CommandLoom Demo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                Explore All Features
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for this section */}
      <style jsx>{`
        @keyframes border-flow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
