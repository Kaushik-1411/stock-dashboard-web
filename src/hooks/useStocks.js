import { getAllStocks, searchStocks, getTopGainers, getTopLosers } from "../services/Stockservice";

import { useState, useEffect, useCallback } from "react";

const MOCK_STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.45, change: 2.35, changePct: 1.33, volume: "52.3M", pe: 29.5 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: -1.20, changePct: -0.84, volume: "28.4M", pe: 25.3 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 425.92, change: 5.67, changePct: 1.35, volume: "25.7M", pe: 35.8 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 252.30, change: -3.45, changePct: -1.35, volume: "115.4M", pe: 65.2 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 186.50, change: 1.85, changePct: 1.00, volume: "48.3M", pe: 58.4 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 875.28, change: 12.45, changePct: 1.44, volume: "42.9M", pe: 72.5 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 495.75, change: -2.30, changePct: -0.46, volume: "15.5M", pe: 28.9 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 645.20, change: 8.90, changePct: 1.40, volume: "4.5M", pe: 45.2 },
];

export function useStocks(){
    const [stocks, setStocks] = useState([]);
    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadInitial(){
            try {
                setLoading(true);
                const [all, top, bottom] = await Promise.all([
                    getAllStocks(),
                    getTopGainers(),
                    getTopLosers(),
                ]);

                // console.log("top gainer:", top);
                console.log("all =", all);
console.log("all.active =", all.active);
                setStocks(all || []);
                setGainers(top);
                setLosers(bottom);
            } catch {
                setStocks(MOCK_STOCKS);
                setGainers([...MOCK_STOCKS].filter(s => s.changePct > 0).sort((a,b) => b.changePct - a.changePct));
                setLosers([...MOCK_STOCKS].filter(s => s.changePct < 0).sort((a,b) => a.changePct - b.changePct));
                setError("Using offline data — backend unreachable.");
            }finally{
                setLoading(false);
            }
        }
        loadInitial();
    }, []);

    const search = useCallback(async (query) => {
        if(!query.trim()) {
            setSearchResults([]);
            return;
        }

        try{
            const results = await searchStocks(query);
            setSearchResults(results);
        } catch (err) {
            const q = query.toLowerCase();
            setSearchResults(
                stocks.filter(s => 
                    s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
                )
            );
        }
    }, [stocks]);

    const clearSearch = useCallback(() => setSearchResults([]), []);

    return { stocks, gainers, losers, searchResults, loading, error, search, clearSearch };
}