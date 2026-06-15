// import { useState } from "react";
// import { COLORS } from "../constants/Theme";
// import AlertModal from "../components/AlertModal";

// export default function AlertsPage({
//     alerts,
//     activeCount,
//     inactiveCount,
//     stocks,
//     onAdd,
//     onToggle,
//     onRemove,
// }) {
//     const [showModal, setShowModal ] = useState(false);

//     const statCards = [
//         { label: "Total Alerts", value: alert.length, color: COLORS.text},
//         { label: "Active Alerts", value: activeCount, color: COLORS.teal},
//         { label: "Inactive Alerts", value: inactiveCount, color: COLORS.text},
//     ];

//     return (
//         <div style={{ padding: "0 24px 40px" }}>

//             {/* page header */}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 0 20px" }}>
//                 <div>
//                     <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6}}>
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                             <path d="M12 2A7 7 0 005 9v4.5H3v2h18v-2h-2V9a7 7 0 00-7-7z" stroke={COLORS.teal} strokeWidth="1.8" />
//                             <path d="M9.5 17.5a2.5 2.5 0 005 0" stroke={COLORS.teal} strokeWidth="1.8" />
//                         </svg>
//                         <h1 style={{ color: COLORS.text, fontSize: 26, fontWeight: 800, margin: 0 }}>
//                             Price Alerts
//                         </h1>
//                     </div>
//                     <p style={{ color: COLORS.textSecondary, fontSize: 14, margin: 0}}>
//                         Get notified when stocks hit your target price
//                     </p>
//                 </div>
//                 <button
//                     onClick={() => setShowModal(true)}
//                     style={{
//                         background: COLORS.teal, border: "none", borderRadius: 8,
//                         padding: "10px 18px", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer"
//                     }}
//                 >
//                     + New Alert
//                 </button>
//             </div>

//             {/* Stat Cards */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24}}>
//                     {statCards.map(card => (
//                         <div key={card.label} style={{
//                             background: COLORS.card, border: `1px solid ${COLORS.border}`,
//                             borderRadius: 12, padding: "18px 20px",
//                         }}>
//                             <div style={{ color: COLORS.textSecondary, fontSize: 12, marginBottom: 8}}>
//                                 {card.label}
//                             </div>
//                             <div style={{ color: card.color, fontSize: 24, fontWeight: 700 }}>{card.value}</div>
//                         </div>
//                     ))}
//             </div>

//             {/* Alert Panel */}

//         </div>
//     )
// }



import { useState } from "react";
// import { COLORS } from "../constants/theme";/
import { COLORS } from "../constants/Theme";
import AlertModal from "../components/AlertModal";

/**
 * AlertsPage
 * Shows price alert stats, the alerts list, and a modal to create new alerts.
 * Self-contained — no navigation needed from this page.
 */
export default function AlertsPage({
  alerts,
  activeCount,
  inactiveCount,
  stocks,
  onAdd,
  onToggle,
  onRemove,
}) {
  const [showModal, setShowModal] = useState(false);

  const statCards = [
    { label: "Total Alerts",    value: alerts.length, color: COLORS.text },
    { label: "Active Alerts",   value: activeCount,   color: COLORS.teal },
    { label: "Inactive Alerts", value: inactiveCount, color: COLORS.text },
  ];

  return (
    <div style={{ padding: "0 24px 40px" }}>

      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 0 20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2A7 7 0 005 9v4.5H3v2h18v-2h-2V9a7 7 0 00-7-7z" stroke={COLORS.teal} strokeWidth="1.8" />
              <path d="M9.5 17.5a2.5 2.5 0 005 0" stroke={COLORS.teal} strokeWidth="1.8" />
            </svg>
            <h1 style={{ color: COLORS.text, fontSize: 26, fontWeight: 800, margin: 0 }}>Price Alerts</h1>
          </div>
          <p style={{ color: COLORS.textSecondary, fontSize: 14, margin: 0 }}>
            Get notified when stocks hit your target price
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: COLORS.teal, border: "none", borderRadius: 8,
            padding: "10px 18px", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}
        >
          + New Alert
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
        {statCards.map(card => (
          <div key={card.label} style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: "18px 20px",
          }}>
            <div style={{ color: COLORS.textSecondary, fontSize: 12, marginBottom: 8 }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: 24, fontWeight: 700 }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Alerts Panel */}
      <div style={{
        background: COLORS.card, border: `1px solid ${COLORS.border}`,
        borderRadius: 12, padding: 24,
      }}>
        {alerts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 16px", display: "block" }}>
              <path d="M24 4A14 14 0 0010 18v9H6v4h36v-4h-4v-9A14 14 0 0024 4z" stroke={COLORS.textMuted} strokeWidth="2" />
              <path d="M19 35a5 5 0 0010 0" stroke={COLORS.textMuted} strokeWidth="2" />
            </svg>
            <div style={{ color: COLORS.textSecondary, fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
              No alerts set up yet
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 24 }}>
              Create your first alert to get notified about price changes
            </div>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: COLORS.teal, border: "none", borderRadius: 8,
                padding: "12px 24px", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}
            >
              + Create Alert
            </button>
          </div>
        ) : (
          alerts.map(alert => {
            const stock     = stocks.find(s => s.symbol === alert.symbol.toUpperCase());
            const triggered = stock && (
              alert.condition === "above"
                ? stock.price >= alert.targetPrice
                : stock.price <= alert.targetPrice
            );
            return (
              <div key={alert.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 0", borderBottom: `1px solid ${COLORS.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: alert.active ? COLORS.teal : COLORS.textMuted,
                  }} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: COLORS.text, fontWeight: 700 }}>{alert.symbol.toUpperCase()}</span>
                      <span style={{ color: COLORS.textSecondary, fontSize: 13 }}>
                        {alert.condition === "above" ? "↑ Above" : "↓ Below"} ${alert.targetPrice.toFixed(2)}
                      </span>
                      {triggered && (
                        <span style={{
                          background: COLORS.tealBg, color: COLORS.teal,
                          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                        }}>
                          Triggered
                        </span>
                      )}
                    </div>
                    <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 2 }}>
                      Created {alert.created}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => onToggle(alert.id)}
                    style={{
                      background: alert.active ? COLORS.tealBg : COLORS.surface,
                      border: `1px solid ${alert.active ? COLORS.teal : COLORS.border}`,
                      borderRadius: 6, padding: "6px 12px",
                      color: alert.active ? COLORS.teal : COLORS.textSecondary,
                      fontSize: 12, cursor: "pointer",
                    }}
                  >
                    {alert.active ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => onRemove(alert.id)}
                    style={{
                      background: "transparent", border: `1px solid ${COLORS.border}`,
                      borderRadius: 6, padding: "6px 10px",
                      color: COLORS.red, fontSize: 12, cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showModal && (
        <AlertModal onClose={() => setShowModal(false)} onSubmit={onAdd} />
      )}
    </div>
  );
}