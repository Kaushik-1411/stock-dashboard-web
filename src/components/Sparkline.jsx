// import { COLORS } from "../constants/theme";
import { COLORS } from "../constants/Theme";

/**
 * Sparkline
 * A tiny inline SVG trend line shown on stock cards.
 *
 * @param {{ positive: boolean, width?: number, height?: number }}
 */
export default function Sparkline({ positive, width = 60, height = 24 }) {
  const pts = positive
    ? [0, 4, 2, 8, 5, 10, 7, 16, 12, 20, 18, 24].map((y, i) => `${(i / 11) * width},${height - y}`)
    : [0, 20, 4, 16, 8, 18, 10, 12, 14, 8, 18, 4].map((y, i) => `${(i / 11) * width},${height - y}`);
  const color = positive ? COLORS.teal : COLORS.red;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}