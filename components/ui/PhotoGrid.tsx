"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/lib/types";
import { useInView } from "@/hooks/useInView";
import Lightbox from "./Lightbox";

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView();

  return (
    <>
      <div className="masonry" ref={ref}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            className={`w-full cursor-zoom-in group ${isInView ? "animate-scale-in stagger-item" : "animate-on-scroll"}`}
            style={{ "--stagger-index": Math.min(i, 12) } as React.CSSProperties}
            onClick={() => setLightboxIndex(i)}
          >
            <Image
              src={photo.thumbSrc}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="w-full h-auto rounded-sm transition-opacity group-hover:opacity-90"
              sizes="(max-width: 768px) 50vw, 33vw"
              loading={i < 6 ? "eager" : "lazy"}
              placeholder={photo.blurDataURL ? "blur" : "empty"}
              blurDataURL={photo.blurDataURL}
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
