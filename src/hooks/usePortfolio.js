import { useState, useEffect, useCallback } from "react";
import { 
    getPortfolio,
    addToPortfolio as apiAdd,
    removeFromPortfolio as apiRemove,
} from "../services/Stockservice";


export function usePortfolio(){
    const[holdings, setHoldings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load(){
            try{
                setLoading(true);
                const data = await getPortfolio();
                setHoldings(data);
            } catch {
                setHoldings([]);
                setError(null);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const addHolding = useCallback(async (stock , qty , avgPrice) => {
        try {
            await apiAdd({ symbol: stock.symbol, qty, avgPrice });
        } catch {
             // Optimistic update — persist locally if API fails
        }

        setHoldings(prev => {
            const existing = prev.find(h => h.stock.symbol === stock.symbol);
            if(existing) {
                const newQty = existing.qty + qty;
                const newAvg = (existing.avgPrice * existing.qty + avgPrice * qty) / newQty;
                return prev.map(h => 
                    h.stock.symbol === stock.symbol
                    ? {...h, qty: newQty, avgPrice: newAvg}
                    : h
                );
            }
            return[...prev, { stock, qty, avgPrice }];
        });
    }, []);


    const removeHolding = useCallback(async(symbol)=>{
        try{
            await apiRemove(symbol);
        } catch { 
      // Optimistic remove — update locally even if API fails
        }
        setHoldings(prev => prev.filter(h => h.stock.symbol !== symbol));
    }, []);

    const totalInvested = holdings.reduce((sum, h) => sum + h.avgPrice * h.qty, 0);
    const totalValue = holdings.reduce((sum, h) => h.stock.price * h.qty, 0);
    const totalPL = totalValue - totalInvested;
    const totalPLPct = totalInvested > 0 ? (totalPL / totalInvested) * 100 : 0;

    return{
        holdings,
        loading,
        error,
        addHolding,
        removeHolding,
        totalValue,
        totalInvested,
        totalPL,
        totalPLPct,
    };
}