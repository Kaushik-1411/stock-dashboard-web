import { useState } from "react";
import { COLORS } from "../constants/Theme";

export default function StockDetail({ stock, onClose, onAddToPortfolio }){
    const [qty, setQty] = useState(1);
    const [avgPrice, setAvgPrice] = useState(stock.price.toFixed(2));
    const positive = stock.changePct >= 0;


    const handleAdd = () => {
        onAddToPortfolio(stock, qty, parseFloat(avgPrice) || stock.price);
        onClose();
    };

    const stats = [
        { label: "Volume", value: stock.volume},
        { label: "P/E Ratio", value: stock.pe},
        { label: "Market Cap", value: "N/A"},
        { label: "52W High", value: `$${(stock.price * 1.25).toFixed(2)}`},
    ];

    return (
        <div
        style={{
            position: "fixed", inset: 0,
            background: "rgb(0,0,0,0,7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000,
        }}
        onClick={onClose}
        >
            <div
            style={{
                background: "#1a1a1a",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 32,
                width: 480,
                maxWidth: "90vw",
            }}
            onClick={
                e => e.stopPropagation()
            }
            >
                {/* Header */}/
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24}}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6}}>
                            <span style={{ color: COLORS.text, fontWeight: 800, fontSize: 22}}>{stock.symbol}</span>
                            <span style={{
                                background: positive ? COLORS.tealBg : COLORS.redBg,
                                color: positive ? COLORS.teal : COLORS.red,
                                fontSize: 12, fontWeight: 600,
                                padding: "3px 10px", borderRadius: 20,
                            }}>
                                {positive ? "+" : ""}{stock.changePct.toFixed(2)}%
                            </span>
                        </div>
                        <div style={{ color: COLORS.textSecondary, fontSize: 13}}>
                            {stock.name}
                        </div>
                        <button
                            onClick={onClose}
                            style={{ background: "none", border: "none", color: COLORS.textSecondary, cursor: "pointer", fontSize: 22}}
                        > 
                         ×
                        </button>
                    </div>

                    {/* price */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24}}>
                            <span style={{ color: COLORS.text, fontSize: 36, fontWeight: 700 }}>${stock.price.toFixed(2)}</span>
                            <span style={{ color: positive ? COLORS.teal : COLORS.red, fontSize: 16, fontWeight: 500}}>
                                {positive ? "+" : ""}${Math.abs(stock.change).toFixed(2)}
                            </span>
                    </div>

                    {/* stats gird */}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap:12, marginBottom: 24}}>
                            {stats.map(stat => (
                                <div key={stat.label} style={{ background: COLORS.surface, borderRadius: 8, padding: "12px 16px"}}>
                                    <div style={{ color: COLORS.textSecondary, fontSize: 11, marginBottom: 4}}>
                                        {stat.label}
                                    </div>
                                    <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 14}}>
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                    </div>


                    {/* add to portfolio */}
                    <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 20}}>
                        <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 14, fontSize: 14}}>
                            Add to Portfolio                             
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 6}}>
                            <div>
                                <label style={{ color: COLORS.textSecondary, fontSize: 12, display: "block", marginBottom: 6}}>
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={qty}
                                    onChange={e => setQty(parseInt(e.target.value) || 1)}
                                    style={{
                                        width: "100%", boxSizing: "border-box",
                                        background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                                        borderRadius: 8, padding: "8px 12px",color: COLORS.text, fontSize: 14,
                                    }}
                                ></input>
                            </div>
                            <div>
                                <label style={{ color: COLORS.textSecondary, fontSize: 12, display: "block", marginBottom: 6}}>
                                    Avg Buy Price ($)
                                </label>
                                <input
                                    type="number"
                                    value={avgPrice}
                                    onChange={e => setAvgPrice(e.target.value)}
                                    style={{
                                        width: "100%", boxSizing: "border-box",
                                        background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                                        borderRadius: 8, padding: "8px 12px", color: COLORS.text, fontSize: 14,
                                    }}
                                >
                                </input>
                            </div>
                        </div>
                            
                    </div>
                    <button
                        onClick={handleAdd}
                        style={{
                            width: "100%", background: COLORS.teal, border: "none",
                            borderRadius: 8, padding: "12px", color: "#000",
                            fontWeight: 700, fontSize: 15, cursor: "pointer",
                        }}
                        >
                            Add to Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
} 