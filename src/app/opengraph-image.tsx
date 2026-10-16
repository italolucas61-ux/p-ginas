import { ImageResponse } from "next/og";

export const alt =
  "Jornada do Zero à Fluência — Aprenda inglês com Teacher Murilo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0B2140",
        padding: "65px 80px",
        color: "white",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", color: "#F4C430" }}
      >
        <span style={{ fontSize: 35, letterSpacing: 6 }}>JORNADA.</span>
        <span style={{ fontSize: 12, letterSpacing: 5, marginTop: 9 }}>
          DO ZERO À FLUÊNCIA
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 71,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: -2,
        }}
      >
        <span>Um novo idioma.</span>
        <span style={{ color: "#F4C430" }}>Novas possibilidades.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          color: "#bac9dc",
          borderTop: "1px solid #3b506c",
          paddingTop: 25,
        }}
      >
        <span>Uma jornada com Teacher Murilo</span>
        <span>APRENDA. PRATIQUE. EVOLUA.</span>
      </div>
    </div>,
    size,
  );
}
