import { useState, useEffect, useCallback, use } from "react";
import {
    getAlerts,
    createAlert as apiCreate,
    updateAlert as apiUpdate,
    deleteAlert as apiDelete,
} from "../services/Stockservice";

export function useAlerts(){
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try{
                setLoading(true);
                const data = await getAlerts();
                setAlerts(data);
            } catch {
                setAlerts([]);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const addAlert = useCallback(async ({ symbol, targetPrice, condition })=> {
        const payload = {
            symbol: symbol.toUpperCase(),
            targetPrice: parseFloat(targetPrice),
            condition,
            active: true,
            created: new Date().toLocaleDateString(),
        };
        try {
            const created = await apiCreate(payload);
            setAlerts(prev => [...prev, created]);
        } catch {
            setAlerts(prev => [...prev, {id: Date.now(), ...payload }]);
        }
    }, []);

    const toggleAlert = useCallback(async (id) => {
        const current = alert.find(a => a.id === id);
        if(!current) return;

        const newActive = !current.active;
        try{
            await apiUpdate(id, newActive);
        } catch {

        }
        setAlerts(prev => prev.map(a => a.id === id ? {...a, active: newActive }: a));
    }, [alerts]);

    const removeAlert = useCallback(async (id) => {
        try{
            await apiDelete(id);
        } catch {

        }
        setAlerts(prev => prev.filter(a => a.id !== id));
    }, []);

    const activeCount = alerts.filter(a => a.active).length;
    const inactiveCount = alerts.filter(a => !a.active).length;

    return {
        alerts,
        loading,
        error,
        addAlert,
        toggleAlert,
        removeAlert,
        activeCount,
        inactiveCount,
    };
}