import React, {useCallback, useEffect, useState} from "react";
import {HeroPickCard} from "@/components/HeroPickCard";
import {Hero} from "@/utils/supabase/types";

interface HeroesListProps {
    value: Hero[];
    bans: Hero[];
    picks: Hero[];
    tags: string[];
    onClick: (hero: Hero) => void;
    className?: string;
    disabled: boolean;
}

export const HeroesList: React.FC<HeroesListProps> = ({value, bans, picks, onClick, className, disabled}) => {
    const [heroes, setHeroes] = useState<Hero[]>(value)
    // const [selectedTag, setSelectedTag] = useState("")

    const callback = useCallback(() => {
        setHeroes(value)
    }, [value])
    
    useEffect(() => {
        callback()
    }, [callback])

    return (
        <div className={`${className}  rounded-2xl border-2 border-foreground flex flex-col content-center `}>
            <div className={`grid grid-cols-7 pl-5 pr-5`}>
                {heroes.map(hero => (
                    <HeroPickCard
                        key={hero.id}
                        dataFilter={hero.type}
                        className="outline-foreground outline-2"
                        value={hero.image_url}
                        size={90}
                        enabled={!(bans.includes(hero) || picks.includes(hero)) && !disabled}
                        onClick={() => onClick(hero)}
                    />
                ))}
            </div>
        </div>
    )
}