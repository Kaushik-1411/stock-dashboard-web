import { COLORS } from '../constants/Theme';


export default function Logo(){
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12}}>
            <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: "linear-gradient(135deg, #00c896 0%, #00c87e 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <polyline points="2,16 7,10 12,13 17,5 20,8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                    <polyline points="17,5 20,5 20,8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div>
                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>
                StockTrader Pro
                </div>
                <div style={{ color: COLORS.textSecondary, fontSize: 11 }}>
                Real-time Trading Platform
                </div>
            </div>
        </div>
    );
}