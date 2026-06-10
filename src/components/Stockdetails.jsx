// import { useState } from "react";
// import { COLORS } from "../constants/Theme";

// export default function StockDetail({ stock, onClose, onAddToPortfolio }){
//     const [qty, setQty] = useState(1);
//     const [avgPrice, setAvgPrice] = useState(stock.price.toFixed(2));
//     const positive = stock.changePct >= 0;


//     const handleAdd = () => {
//         onAddToPortfolio(stock, qty, parseFloat(avgPrice) || stock.price);
//         onClose();
//     };

//     const stats = [
//         { label: "Volume", value: stock.volume},
//         { label: "P/E Ratio", value: stock.pe},
//         { label: "Market Cap", value: "N/A"},
//         { label: "52W High", value: `$${(stock.price * 1.25).toFixed(2)}`},
//     ];

//     return (
//         <div
//         style={{
//             position: 
//         }}
//         ></div>
//     )


// }