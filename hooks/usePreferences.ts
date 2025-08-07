import { Preferences } from "@/type/type";
import { useEffect, useState } from "react";

// note : tracking lines are temporary

export default function usePreferences() {
    const [prefs, setPrefs] = useState<Preferences>(()=>{
        if (typeof window !== 'undefined'){
            const saved = localStorage.getItem('cryptoPrefs')
            return saved ? JSON.parse(saved) : {
                currency: 'Bitcoin',
                trackingLines: []
            }
        }
    })
    useEffect(()=>{
        localStorage.setItem('cryptoPrefs', JSON.stringify(prefs))
    },[prefs])
    const addTrackingLine = (price: number) => {
        setPrefs(prev => ({
            ...prev,
            trackingLines: [...prev.trackingLines, price]
        }));
    };
    const removeTrackingLine = (index: number) => {
        setPrefs(prev => ({
            ...prev,
            trackingLines: prev.trackingLines.filter((_, i) => i !== index)
        }));
    };
    const setCurrency = (coinId: string) => {
        setPrefs(prev => ({ ...prev, currency: coinId }));
    };
    return {
        preferences: prefs,
        addTrackingLine,
        removeTrackingLine,
        setCurrency
    };
}