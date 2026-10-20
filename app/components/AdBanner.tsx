"use client";

interface AdBannerProps {
  adKey: string;
  src: string;
  width?: number;
  height?: number;
  language: "id" | "en";
}

export default function AdBanner({
  adKey,
  src,
  width = 300,
  height = 250,
  language,
}: AdBannerProps) {
  const srcDoc = `<!doctype html><html><body style="margin:0;display:flex;justify-content:center">
<script>atOptions={'key':'${adKey}','format':'iframe','height':${height},'width':${width},'params':{}};</script>
<script src="${src}"></script>
</body></html>`;

  return (
    <div className="mt-8 flex flex-col items-center">
      <span className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-[#3F5147]/60">
        {language === "id" ? "Iklan" : "Sponsored"}
      </span>
      <iframe
        title="Advertisement"
        srcDoc={srcDoc}
        width={width}
        height={height}
        scrolling="no"
        style={{ border: 0, maxWidth: "100%" }}
      />
    </div>
  );
}