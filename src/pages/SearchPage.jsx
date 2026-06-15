import { COLORS } from "../constants/Theme";
import StockCard from "../components/StockCard";
import { useState, useEffect} from "react";

export default function SearchPage({
    stocks,
    gainers,
    losers,
    searchResults,
    loading,
    onSearch,
    onClearSearch,
    onStockClick,
}){
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if(query.trim()) {
                onSearch(query);
            } else {
                onClearSearch();
            }
        },300);

        return () => clearTimeout(timer);
    }, [ query, onSearch, onClearSearch]);

    const isSearching = query.trim().length > 0;
    const displayList = isSearching ? searchResults : stocks;

    console.log("stocks:", stocks);
console.log("gainers:", gainers);
console.log("losers:", losers);
console.log("searchResults:", searchResults);
console.log("displayList:", displayList);

    return (
        <div style={{ padding: "0 24px 40px"}}>

            <div style={{
                background: "linear-gradient(135deg, #0f2a22 0%, #0a1f1a 50%, #0d1f2d 100%)",
                borderRadius: 16,
                padding: "36px 32px 40px",
                marginBottom: 28,
                marginTop: 20,
                border: " 1px solid #1a3a2e",
            }}>
                <h1 style={{ color: COLORS.text, fontSize: 26, fontWeight: 800, margin: "0 0 8px"}}>
                    Welcome to StockTrader Pro
                </h1>
                <p style={{ color: COLORS.textSecondary, fontSize: 14, margin: "0 0 24px" }}>
                    Search stocks, track your portfolio, and get AI-powered BUY/SELL recommendations
                </p>

                <div style={{ position: "relative", maxWidth: 540 }}>
                    <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
                    >
                        <circle cx="7" cy="7" r="5" stroke={COLORS.textSecondary} strokeWidth="1.6" />
                        <line x1="11" y1="11" x2="15" y2="15" stroke={COLORS.textSecondary} strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <input
                    placeholder="Search stocks by symbol or name (e.g., AAPL, Tesla)..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{
                        width: "100%", boxSizing: "border-box",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 10,
                        padding: "12px 16px 12px 42px",
                        color: COLORS.text,
                        fontSize: 14,
                        outline: "none",
                    }}
                    ></input>
                         
                </div>
            </div>




            {isSearching ? (
                <>
                <div style={{color: COLORS.textSecondary, fontSize: 13, marginBottom: 16}}>
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{query}"
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
                    {searchResults.map(s => (
                        <StockCard key={s.symbol} stock={s} onClick={onStockClick}></StockCard>
                    ))}
                </div>
                </>
            ) : (
                <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap:20, marginBottom: 28}}>
                    {[
                        {title: "Top Gainers", data: gainers, positive: true},
                        {title: "Top Losers", data: losers, positive: false},
                    ].map(section => (
                        <div
                        key={section.title}
                        style={{
                            background: COLORS.card,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 12,
                            padding: 20,
                            height: '400px',
                            overflowX: 'auto',
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16}}>
                                {section.positive ? (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 12L6 7l4 3 4-7" stroke={COLORS.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 4L6 9l4-3 4 7" stroke={COLORS.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                                <span style={{
                                    color: section.positive ? COLORS.teal : COLORS.red,
                                    fontWeight: 700, fontSize: 14,
                                }}>
                                    {section.title}
                                </span>
                            </div>

                            {section.data.map(s => (
                                <div
                                key={s.symbol}
                                onClick={() => onStockClick(s)}
                                style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "12px 0",
                                    borderBottom: `1px solid ${COLORS.border}`,
                                    cursor:"pointer",
                                }}
                                >
                                    <div>
                                        <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 14}}>{s.symbol}</div>
                                        <div style={{ color: COLORS.textSecondary, fontSize: 12}}>{s.name}</div>
                                    </div>
                                   <div style={{ textAlign: "right"}}>
                                        <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 14}}>${s.price.toFixed(2)}</div>
                                        <div style={{ color: section.positive ? COLORS.teal : COLORS.red, fontSize: 12, fontWeight: 500}}>
                                            {section.positive ? "+" : ""}{Number(s.changePercent || 0).toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>


                <div style={{color: COLORS.textSecondary, fontSize: 14, fontWeight: 600, marginBottom: 14 }}>
                    All Stocks
                </div>

                { loading ? (
                    <div style={{ color: COLORS.textSecondary, fontSize: 14, textAlign: "center", padding: "40px 0"}}>
                        Loading stocks...
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
                        {displayList.map(s => (
                            <StockCard key={s.symbol} stock={s} onClick={onStockClick}></StockCard>
                        ))}
                    </div>
                )}
                </>
            )}
        </div>
    );
}