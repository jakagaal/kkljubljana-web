import { ImageResponse } from "next/og";

export const alt = "Karate Klub Ljubljana — karate za otroke in odrasle od 1971";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f5f1e8",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 8, background: "#cc1f2c" }} />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#cc1f2c",
            }}
          >
            Est. 1971
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 116, fontWeight: 800, lineHeight: 1 }}>
            KARATE KLUB
          </div>
          <div
            style={{
              fontSize: 116,
              fontWeight: 800,
              lineHeight: 1,
              color: "#cc1f2c",
            }}
          >
            LJUBLJANA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid rgba(245,241,232,0.2)",
            paddingTop: 28,
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex", color: "rgba(245,241,232,0.75)" }}>
            Karate za otroke, rekreativce in tekmovalce
          </div>
          <div style={{ display: "flex", color: "rgba(245,241,232,0.5)" }}>
            kkljubljana.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
