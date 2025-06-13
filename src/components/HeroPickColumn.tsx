import React from "react";
import {HeroPickCard} from "@/components/HeroPickCard";

interface HeroPickColumnProps {
    value: number[];
    borderColor: string;
    className?: string;
}

export const HeroPickColumn: React.FC<HeroPickColumnProps> = ({value, borderColor, className}) => {
    return (
        <div className={`${className} flex flex-col justify-evenly p-2 rounded-2xl border-2 ${borderColor}`}>
            {value.map(i => (
                <HeroPickCard
                    key={i}
                    value="https://dvlduuubunqdawuujpgi.supabase.co/storage/v1/object/public/heroes/sniper/blot.png"
                />
            ))}
        </div>
    )
}