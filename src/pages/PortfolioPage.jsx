import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants/Theme";

export default function PortfolioPage({
    holdings,
    totalValue,
    totalInvested,
    totalPL,
    totalPLPct,
    onRemove,
}) {
    const navigate = useNavigate();
    const plPositive = totalPL >= 0;

    const statCards = [
        { label: "Total Value", value: `$${totalValue.toFixed(2)}`, color: COLORS.text },
        { label: "Total Invested", value: `$${totalInvested.toFixed(2)}`, color: COLORS.text},
        {
            label: "Total P/L",
            value: `${plPositive ? "+": ""}$${Math.abs(totalPL).toFixed(2)}`,
            sub: `${plPositive ? "+" : ""}${totalPLPct.toFixed(2)}%`,
            color: plPositive ? COLORS.teal : COLORS.red,
        },
        { label: "Holdings", value: holdings.length, sub: "stocks", color: COLORS.text },
    ];




    return(
        <div style={{ padding: "0 24px 40px" }}>

            {/* page header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 0 20px" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="7" width="20" height="15" rx="2.5" stroke={COLORS.teal} strokeWidth="1.8" />
                            <path d="M8 7V6a4 4 0 018 0v1" stroke={COLORS.teal} strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        <h1 style={{ color: COLORS.text, fontSize: 26, fontWeight: 800, margin: 0}}>
                            My Portfolio
                        </h1>
                    </div>
                    <p style={{ color: COLORS.textSecondary, fontSize: 14, margin: 0}}>
                        Track your investment and profit/loss
                    </p>
                </div>

                <button
                    onClick={() => navigate("/search")}
                    style={{
                       background: COLORS.teal, border: "none", borderRadius: 8,
                       padding: "10px 18px", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer" 
                    }}
                >
                    + Add Stock
                </button>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24}}>
                    {statCards.map(card => (
                        <div key={card.label} style={{
                            background: COLORS.card, border: `1px solid ${COLORS.border}`,
                            borderRadius: 12, padding: "18px 20px",
                        }}>
                            <div style={{ color: COLORS.textSecondary, fontSize: 12, marginBottom: 8}}>{card.label}</div>
                            <div style={{ color: card.color, fontSize: 22, fontWeight: 700 }}>{card.value}</div>
                            {card.sub && (
                                <div style={{ color: card.color, fontSize: 12, marginTop: 2, opacity: 0.8}}>{card.sub}</div>
                            )}
                        </div>
                    ))}
            </div>


            {/* Holding Panel */}
            <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 12, padding: 24,
            }}>

                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 16, marginBottom: 20}}>
                    Your Holdings
                </div>

                {holdings.length ===0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0"}}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 16px", display: "block" }}>
                            <rect x="4" y="14" width="40" height="30" rx="5" stroke={COLORS.textMuted} strokeWidth="2" />
                            <path d="M16 14V12a8 8 0 0116 0v2" stroke={COLORS.textMuted} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        
                        <div style={{ color: COLORS.textSecondary, fontSize: 16, fontWeight: 500, marginBottom: 8}}>
                            Your portfolio is Empty
                        </div>
                        <div style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 24 }}>
                            Start by searching for stocks and adding them to your portfolio
                        </div>
                        <button
                        onClick={() => navigate("/search")}
                        style={{
                            background: COLORS.teal, border: "none", borderRadius: 8,
                            padding: "12px 24px", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer"
                        }}
                        >
                            + Browse Stocks
                        </button>
                    </div>
                ) : (
                    <table style={{ width : "1000%", borderCollapse: "collapse", fontSize: 14}}>
                        <thead>
                            <tr style={{ borderBottom: `1px solid ${COLORS.border}`}}>
                                {["Symbol", "Name", "Qty", "Avg Price", "Current", "P/L", "Value", ""].map(
                                    h => (
                                        <th key={h} style={{
                                            color: COLORS.textSecondary, fontWeight: 500,
                                            textAlign: 'left', padding: "0 12px 12px 0", fontSize: 12,
                                        }}>
                                            {h}
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {holdings.map(h => {
                                const value = h.stock.price * h.qty;
                                const pl = value - h.avgPrice * h.qty;
                                const plPct = ((pl / (h.avgPrice * h.qty)) * 100).toFixed(2);
                                const pos = pl >= 0;

                                return(
                                    <tr key={h.stock.symbol} style={{ borderBottom: `1px solid ${COLORS.border}`}}>
                                        <td style={{ padding: "14px 12px 14px 0"}}>
                                            <span style={{ color: COLORS.text, fontWeight: 700}}>{h.stock.symbol}</span>
                                        </td>
                                        <td style={{ padding: "14px 12px 14px 0", color: COLORS.textSecondary}}>
                                            {h.stock.name}
                                        </td>
                                        <td style={{ padding: "14px 12px 14px 0", color: COLORS.text}}>{h.qty}</td>
                                        <td style={{ padding: "14px 12px 14px 0", color: COLORS.text}}>${h.avgPrice.toFixed(2)}</td>
                                        <td style={{ padding: "14px 12px 14px 0", color: COLORS.text}}>${h.stock.price.toFixed(2)}</td>
                                        <td style={{ padding: "14px 12px 14px 0"}}>
                                            <span style={{  color: pos ? COLORS.teal : COLORS.red, fontWeight: 600}}>
                                                {pos ? "+" : ""}${Math.abs(pl).toFixed(2)}({pos ? "+" : ""}{plPct})
                                            </span>
                                        </td>

                                        <td style={{ padding: "14px 12px 14px 0", color: COLORS.text, fontWeight: 600}}>
                                            ${value.toFixed(2)}
                                        </td>
                                        <td style={{ padding: "14px 0"}}>
                                            <button
                                            onClick={() => onRemove(h.stock.symbol)}
                                            style={{
                                                background: "transparent", border: `1px solid ${COLORS.border}`,
                                                borderRadius: 6, padding: "4px 10px",
                                                color: COLORS.red, fontSize: 12, cursor: "pointer",
                                            }}
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}