"use client";

function getLogoSide(idx, total, mode) {
  if (mode === "grid") return idx % 2 === 0 ? "l" : "r";
  return idx < total / 2 ? "l" : "r";
}

export default function CustomerLogoItem({
  src,
  alt,
  imgClass,
  idx = 0,
  total = 1,
  revealed = false,
  animate = true,
  mode = "marquee",
  cols: _cols = 4,
  wrapperClassName = "group relative flex h-20 w-40 shrink-0 items-center justify-center overflow-visible",
  imgClassName = "cm-logo-item max-h-16 w-auto opacity-70 group-hover:opacity-100",
  showTooltip = true,
}) {
  const side = getLogoSide(idx, total, mode);
  const animClass = animate ? `cm-logo-in-${side}${revealed ? " on" : ""}` : "";
  const imgClasses = [imgClassName, imgClass].filter(Boolean).join(" ");

  return (
    <div
      className={[wrapperClassName, animClass].filter(Boolean).join(" ")}
      style={animate && revealed ? { animationDelay: `${idx * 80}ms` } : undefined}
    >
      <img src={src} alt={alt} draggable={false} className={imgClasses} />
      {showTooltip ? (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-200 bg-white/90 px-5 py-1.5 text-sm text-slate-800 opacity-0 shadow-sm backdrop-blur-md transition duration-200 group-hover:opacity-100">
          {alt}
        </div>
      ) : null}
    </div>
  );
}
