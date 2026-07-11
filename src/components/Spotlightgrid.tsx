"use client";

import { useRef, useState, ReactNode } from "react";

type SpotlightGridProps = {
    /** Content rendered on top of the spotlight effect */
    children?: ReactNode;
    /** Extra classes for the outer wrapper (set your own bg, height, padding, etc.) */
    className?: string;
    /** Hex/rgb color used for the dot grid + glow. Defaults to CircleX indigo. */
    color?: string;
    /** Color of the base (always-visible) faint dot grid. Defaults to `color`. */
    baseColor?: string;
    /** Spacing between dots in px */
    gridSize?: number;
    /** Dot radius in px */
    dotSize?: number;
    /** Radius of the revealed spotlight circle in px */
    spotlightRadius?: number;
    /** Opacity of the always-visible base grid (0–1) */
    baseOpacity?: number;
    /** Opacity of the revealed grid inside the spotlight (0–1) */
    revealOpacity?: number;
};

/**
 * Wrap any section in this to get a cursor-reactive dot-grid spotlight:
 * a faint grid is always visible, and moving the mouse reveals a brighter,
 * glowing patch of the grid under the cursor.
 *
 * Usage:
 *   <SpotlightGrid className="bg-[#06060e] min-h-screen">
 *     <YourContent />
 *   </SpotlightGrid>
 */
export default function SpotlightGrid({
    children,
    className = "",
    color = "#6366F1",
    baseColor,
    gridSize = 28,
    dotSize = 1,
    spotlightRadius = 220,
    baseOpacity = 0.15,
    revealOpacity = 0.5,
}: SpotlightGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSpotlight({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
            active: true,
        });
    };

    const gridColor = baseColor || color;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setSpotlight((s) => ({ ...s, active: false }))}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Base dot-grid texture (always faintly visible) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: baseOpacity,
                    backgroundImage: `radial-gradient(circle, ${gridColor} ${dotSize}px, transparent ${dotSize}px)`,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                }}
            />

            {/* Soft ambient glow that follows the cursor */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                    opacity: spotlight.active ? 1 : 0,
                    background: `radial-gradient(${spotlightRadius + 100}px circle at ${spotlight.x}% ${spotlight.y}%, ${hexToRgba(color, 0.14)}, transparent 70%)`,
                }}
            />

            {/* Brighter revealed dot-grid inside the spotlight circle */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                    opacity: spotlight.active ? revealOpacity : 0,
                    backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                    WebkitMaskImage: `radial-gradient(${spotlightRadius}px circle at ${spotlight.x}% ${spotlight.y}%, black, transparent 70%)`,
                    maskImage: `radial-gradient(${spotlightRadius}px circle at ${spotlight.x}% ${spotlight.y}%, black, transparent 70%)`,
                }}
            />

            {/* Actual content, above the effect */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

/** Converts #rrggbb (or rgb() strings) into an rgba() string with the given alpha */
function hexToRgba(color: string, alpha: number): string {
    if (color.startsWith("rgb")) {
        // Already rgb/rgba — just reuse the channel values
        const nums = color.match(/[\d.]+/g);
        if (nums && nums.length >= 3) {
            return `rgba(${nums[0]}, ${nums[1]}, ${nums[2]}, ${alpha})`;
        }
        return color;
    }
    const hex = color.replace("#", "");
    const bigint = parseInt(
        hex.length === 3
            ? hex.split("").map((c) => c + c).join("")
            : hex,
        16
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}