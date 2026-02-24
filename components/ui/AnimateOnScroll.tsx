"use client";

import { type ReactNode, type ElementType } from "react";
import { useInView } from "@/hooks/useInView";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
  as?: ElementType;
}

export default function AnimateOnScroll({
  children,
  animation = "animate-fade-up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView();

  return (
    <Tag
      ref={ref}
      className={`${isInView ? animation : "animate-on-scroll"} ${className}`}
      style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
