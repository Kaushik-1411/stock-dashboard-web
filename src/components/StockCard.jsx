import { COLORS } from "../constants/Theme";
import Sparkline from "./Sparkline";

export default function StockCard({stock, onClick}){
    const positive = stock.changePct >= 0;

    return (
        <div
        onClick={() => onClick(stock)}
        style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: "16px 20px",
            cursor: "pointer",
            transition: "border-color 0.15s, background 0.15s",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
        }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#3a3a3a";
            e.currentTarget.style.background = COLORS.surfaveHover;
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = COLORS.border;
            e.currentTarget.style.background = COLORS.card;
        }}
        >
            <div style={{ flex: 1}}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4}}>
                    <span style={{ color: COLORS.text, fontWeight: 700, fontSize: 15}}>{stock.symbol}</span>
                    <span style={{
                        background: positive ? COLORS.tealBg : COLORS.redBg,
                        color: positive ? COLORS.teal : COLORS.red,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 20,
                    }}>
                        {positive ? "+" : ""}{stock.changePct.toFixed(2)}%
                    </span>
                </div>
                <div style={{ color: COLORS.textSecondary, fontSize: 12, marginBottom: 8}}>
                    {stock.name}
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: 11 }}>
                    Vol: {stock.volume}&nbsp;&nbsp;P/E: {stock.pe}
                </div>
            </div>

            <div style={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
            
            }}>
                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 17 }}>
                    ${stock.price.toFixed(2)}
                </div>
                <div style={{ color: positive ? COLORS.teal : COLORS.red, fontSize: 13, fontWeight: 500}}>
                    {positive ? "+" : ""}${Math.abs(stock.change).toFixed(2)}
                </div>
                <div style={{ marginTop: 4}}>
                    <Sparkline positive={positive}></Sparkline>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: COLORS.textMuted, marginTop: 2 }}>
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}