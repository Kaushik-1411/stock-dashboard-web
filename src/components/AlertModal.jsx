import { useState } from "react";
import { COLORS } from "../constants/Theme";


export default function AlertModal({ onClose, onSubmit }) {
    const [form , setForm] = useState({ symbol: "", targetPrice: "", condition: "above" });

    const handleSubmit = () => {
        if(!form.symbol.trim() || !form.targetPrice) return;
        onSubmit(form);
        onClose();
    };

    const update = (key, value) => setForm(prev => ({...prev, [key]: value}));

    const inputStyle = {
        width: "100%", boxSizing: "border-box",
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8, padding: "10px 12px",
        color: COLORS.text, fontSize: 14,
    };

    return(
        <div
        style={{
            position: "fixed", inset: 0,
            background: "rgba(0, 0, 0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000,
        }}
        onClick={onClose}
        >
            <div
            style={{
                background: "#1a1a1a",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: 32,
                width: 400, maxWidth: "90vw",
            }}
            onClick={e => e.stopPropagation()}
            >
                {/* header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24}}>
                    <span style={{ color: COLORS.text, fontWeight: 700, fontSize: 18, }}>Create Price Alert</span>
                    <button
                    onClick={onClose}
                    style={{ background: "none", border: "none", color: COLORS.textSecondary, cursor: "pointer", fontSize: 22}}
                    >
                        ✕
                    </button>
                </div>

                {/* symbol */}
                <div style={{ marginBottom: 16}}>
                    <label style={{ color: COLORS.textSecondary, fontSize: 12, display: "block", marginBottom: 6}}>
                        Stock Symbol
                    </label>
                    <input
                    type="text"
                    placeholder="e.g., AAPL"
                    value={form.symbol}
                    onChange={e => update("symbol", e.target.value)}
                    style={inputStyle}
                    ></input>
                </div>

                {/* target price */}
                <div style={{ marginBottom: 16}}>
                    <label style={{ color: COLORS.textSecondary, fontSize: 12, display: "block", marginBottom: 6 }}>
                        Target Price ($)
                    </label>
                    <input
                        type="number"
                        placeholder="e.g., 180.00"
                        value={form.targetPrice}
                        onChange={e => update("targetPrice", e.target.value)}
                        style={inputStyle}
                    />
                </div>

                {/* condition */}
                <div style={{ marginBottom: 24}}>
                    <label style={{ color: COLORS.textSecondary, fontSize: 12, display: "block", marginBottom: 6}}>
                        Condition
                    </label>
                    <select
                    value={form.condition}
                    onChange={e => update("condition", e.target.value)}
                    style={inputStyle}
                    >
                        <option value="above"> Price goes above target</option>
                        <option value="below"> Price goes below target</option>
                    </select>
                </div>

                <button
                onClick={handleSubmit}
                style={{
                    width: "100%", background: COLORS.teal, border: "none",
                    borderRadius: 8, padding: "12px", color: "#000",
                    fontWeight: 700, fontSize: 15, cursor: "pointer",
                }}
                >
                    Create Alert
                </button>
            </div>
        </div>
    );
}