"use client";

import { useEffect, useRef } from "react";

interface AdNativeProps {
  adKey: string;
  src: string;
  language: "id" | "en";
  className?: string;
}

export default function AdNative({
  adKey,
  src,
  language,
  className = "",
}: AdNativeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const container = document.createElement("div");
    container.id = `container-${adKey}`;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = src;

    el.append(container, script);

    return () => el.replaceChildren();
  }, [adKey, src]);

  return (
    <div
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
      className={`overflow-hidden rounded-[20px] border border-black/5 bg-white p-4 text-sm leading-snug text-[#12291F] shadow-[0_2px_10px_rgba(18,41,31,0.05)] ${className}`}
    >
      <span className="mb-2 block text-[10px] font-medium uppercase tracking-wide text-[#3F5147]/60">
        {language === "id" ? "Iklan" : "Sponsored"}
      </span>
      <div ref={ref} className="[&_img]:rounded-xl" />
    </div>
  );
}