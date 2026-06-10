import {NavLink} from "react-router-dom";
import { COLORS } from "../constants/Theme";

import Logo from "./Logo";

const NAV_TABS = [
    {
        path: "/search",
        label: "Search",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"></circle>
                <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></line>
            </svg>
        ),
    },
    {
        path: "/portfolio",
        label: "Portfolio",
        icon: (
            <svg width="16" height="16" viewBox=" 0 0 16 16" fill="none">
                <rect x="1" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"></rect>
                <path d="M5 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
            </svg>
        ),
    },
    {
        path: "/Alerts",
        label: "Alerts",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5A5.5 5.5 0 002.5 7v3.5H1v1.5h14v-1.5h-1.5V7A5.5 5.5 0 008 1.5z" stroke="currentColor" strokeWidth="1.4" />
                <path d="M6.5 13.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" />
            </svg>
        ),
    },
];

export default function Navbar(){


    return (
        <nav style={{
        background: "#161616",
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        position: "sticky",
        top: 0,
        zIndex: 100,
        }}>
        <Logo />

{/* <div style={{ color: "white" }}>Logo</div>     */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {NAV_TABS.map(tab => (
            <NavLink
                key={tab.path}
                to={tab.path}
                style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                textDecoration: "none",
                background: isActive ? COLORS.teal : "transparent",
                color: isActive ? "#000" : COLORS.textSecondary,
                fontWeight: isActive ? 600 : 400,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.15s",
                })}
            >
                {tab.icon}
                {tab.label}
            </NavLink>
            ))}
        </div>
        </nav>
    );
}

// export default function Navbar() {
//   return (
//     <div style={{ color: "white", background: "red", padding: "20px" }}>
//       Navbar Working
//     </div>
//   );
// }