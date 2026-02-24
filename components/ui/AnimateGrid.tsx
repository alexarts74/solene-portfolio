"use client";

import { type ReactNode, Children, type ElementType } from "react";
import { useInView } from "@/hooks/useInView";

interface AnimateGridProps {
  children: ReactNode;
  animation?: string;
  staggerMs?: number;
  className?: string;
  as?: ElementType;
}

export default function AnimateGrid({
  children,
  animation = "animate-fade-up",
  staggerMs = 80,
  className = "",
  as: Tag = "div",
}: AnimateGridProps) {
  const { ref, isInView } = useInView();

  return (
    <Tag ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <div
          className={`${isInView ? `${animation} stagger-item` : "animate-on-scroll"}`}
          style={{ "--stagger-index": Math.min(i, 12) } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </Tag>
  );
}
