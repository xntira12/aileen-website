"use client";

export default function CustomerLogosHeader({ revealed = false, className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex justify-center pb-3 sm:pb-4">
        <span
          className={`cm-rv ${revealed ? "on" : ""} inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/5 px-4 py-2 text-xs tracking-widest text-slate-600 backdrop-blur`}
        >
          <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,.6)]" />
          OUR CUSTOMERS
        </span>
      </div>

      <h2
        className={`cm-rv ${revealed ? "on" : ""} text-center text-2xl font-extrabold tracking-tight sm:text-3xl`}
        style={{
          animationDelay: "80ms",
          background: "linear-gradient(90deg,#0f172a 60%,#10b981)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        ได้รับความไว้วางใจจากองค์กรชั้นนำ
      </h2>

      <span className={`cm-line ${revealed ? "on" : ""}`} />

      <p
        className={`cm-rv ${revealed ? "on" : ""} mt-3 text-center text-sm font-light text-slate-500`}
        style={{ animationDelay: "160ms" }}
      >
        บริษัทชั้นนำในอุตสาหกรรมพลังงานและปิโตรเคมีที่ไว้วางใจ Aileen Solutions
      </p>
    </div>
  );
}
