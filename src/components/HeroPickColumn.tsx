import React from "react";
import {HeroPickCard} from "@/components/HeroPickCard";
import {emptyHero, Hero} from "@/utils/supabase/types";

interface HeroPickColumnProps {
    value: number[];
    picks: Hero[];
    borderColor: string;
    className?: string;
}

export const HeroPickColumn: React.FC<HeroPickColumnProps> = ({value, picks, borderColor, className}) => {
    return (
        <div className={`${className} flex flex-col justify-evenly p-2 rounded-2xl border-2 border-${borderColor}`}>
            {value.map(i => (
                <HeroPickCard
                    key={i}
                    value={picks.length > i ? picks[i].image_url : emptyHero}
                    size={90}
                    enabled={true}
                    className={`outline-0 border-2 ${className}`}
                    onClick={() => {}}
                />
            ))}
        </div>
    )
}