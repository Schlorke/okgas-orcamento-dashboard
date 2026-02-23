import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main flame */}
        <path
          d="M50 5C50 5 20 40 20 70C20 90 33 110 50 115C67 110 80 90 80 70C80 40 50 5 50 5Z"
          fill="url(#flameGrad)"
        />
        {/* Inner flame */}
        <path
          d="M50 35C50 35 35 55 35 72C35 85 42 98 50 100C58 98 65 85 65 72C65 55 50 35 50 35Z"
          fill="url(#innerGrad)"
        />
        {/* Small right flame */}
        <path
          d="M72 50C72 50 62 65 62 78C62 88 66 95 72 97C78 95 82 88 82 78C82 65 72 50 72 50Z"
          fill="url(#smallGrad)"
        />
        <defs>
          <linearGradient
            id="flameGrad"
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
            id="innerGrad"
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
            id="smallGrad"
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
    </div>,
    { ...size }
  )
}
