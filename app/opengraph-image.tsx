import { ImageResponse } from "next/og"

export const alt = "OK Gás Engenharia — Dashboard Executivo"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0a0e1a 0%, #0d1b2a 40%, #112240 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-50px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "60px",
          padding: "0 80px",
        }}
      >
        {/* Flame icon */}
        <svg
          width="200"
          height="240"
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5C50 5 20 40 20 70C20 90 33 110 50 115C67 110 80 90 80 70C80 40 50 5 50 5Z"
            fill="url(#ogFlame)"
          />
          <path
            d="M50 35C50 35 35 55 35 72C35 85 42 98 50 100C58 98 65 85 65 72C65 55 50 35 50 35Z"
            fill="url(#ogInner)"
          />
          <path
            d="M72 50C72 50 62 65 62 78C62 88 66 95 72 97C78 95 82 88 82 78C82 65 72 50 72 50Z"
            fill="url(#ogSmall)"
          />
          <defs>
            <linearGradient
              id="ogFlame"
              x1="50"
              y1="5"
              x2="50"
              y2="115"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0D5C8C" />
              <stop offset="1" stopColor="#7DD4F0" />
            </linearGradient>
            <linearGradient
              id="ogInner"
              x1="50"
              y1="35"
              x2="50"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A85D9" />
              <stop offset="1" stopColor="#B8E6FA" />
            </linearGradient>
            <linearGradient
              id="ogSmall"
              x1="72"
              y1="50"
              x2="72"
              y2="97"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1576B8" />
              <stop offset="1" stopColor="#5EC4ED" />
            </linearGradient>
          </defs>
        </svg>

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              display: "flex",
            }}
          >
            OK Gás Engenharia
          </div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 400,
              color: "#93c5fd",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Dashboard Executivo de Progresso
          </div>
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "3px",
                background: "linear-gradient(90deg, #2563eb, #0ea5e9)",
                borderRadius: "2px",
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#64748b",
                display: "flex",
              }}
            >
              Gestão de Frotas &bull; IA &bull; Controle de Processos
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "4px",
          background:
            "linear-gradient(90deg, #1e40af, #2563eb, #0ea5e9, #38bdf8)",
          display: "flex",
        }}
      />
    </div>,
    { ...size }
  )
}
