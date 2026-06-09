"use client";

import { useEffect, useState } from "react";
import { GalleryTile } from "./NewsComponents";

export default function NewsGallery({ items, category }) {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (!activeItem) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <GalleryTile
            key={item.title}
            title={item.title}
            ratio={item.ratio}
            category={category}
            image={item.image}
            alt={item.alt}
            onOpen={item.image ? () => setActiveItem(item) : undefined}
          />
        ))}
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-4 py-6"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.alt || activeItem.title}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-xl text-white backdrop-blur transition hover:bg-black/55"
              aria-label="ปิดรูปภาพ"
            >
              ×
            </button>

            <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_80px_rgba(15,23,42,0.35)]">
              <img
                src={activeItem.image}
                alt={activeItem.alt || activeItem.title}
                className="max-h-[78vh] w-full bg-slate-100 object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
