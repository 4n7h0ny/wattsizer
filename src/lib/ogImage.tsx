import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared 1200×630 social preview card (shown when links are posted on Reddit, Facebook, etc.). */
export function renderOgImage(eyebrow: string, title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(160deg, #0f172a 0%, #020617 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#fbbf24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              color: "#020617",
              fontWeight: 900,
            }}
          >
            ⚡
          </div>
          <div style={{ display: "flex", fontSize: "36px", fontWeight: 900 }}>
            Watt<span style={{ color: "#fbbf24" }}>Sizer</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "26px", color: "#fbbf24", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: "64px", fontWeight: 900, lineHeight: 1.1, marginTop: "12px" }}>
            {title}
          </div>
          <div style={{ fontSize: "30px", color: "#cbd5e1", marginTop: "20px" }}>
            {subtitle}
          </div>
        </div>
        <div style={{ fontSize: "24px", color: "#94a3b8" }}>
          Free calculator · Estimates from manufacturer specs
        </div>
      </div>
    ),
    OG_SIZE
  );
}
