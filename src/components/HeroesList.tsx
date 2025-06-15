import React, {useCallback, useEffect, useState} from "react";
import {HeroPickCard} from "@/components/HeroPickCard";
import Image from "next/image";
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

export const HeroesList: React.FC<HeroesListProps> = ({value, bans, picks, tags, onClick, className, disabled}) => {
    const [heroes, setHeroes] = useState<Hero[]>(value)
    const [selectedTag, setSelectedTag] = useState("")

    const callback = useCallback((tag: string) => {
        if (tag.length == 0) {
            setHeroes(value)
        } else {
            setHeroes(value.filter(h => h.type == tag))
        }
    }, [value])
    
    useEffect(() => {
        callback(selectedTag)
    }, [callback, selectedTag])

    const onTagClick = (tag: string) => {
        if (selectedTag == tag) {
            setSelectedTag("")
        } else {
            setSelectedTag(tag)
        }
    }

    return (
        <div className={`${className}  rounded-2xl border-2 border-foreground flex flex-col content-center `}>
            <div className="m-4 flex flex-row justify-center ">
                <div className="size-16 content-center">
                    <Image src="/filter.svg" width={40} height={40} className="invert-100" alt="filter" />
                </div>
                {tags.map(tag => (
                    <label
                        key={tag}
                        className="h-16 w-25 p-3 rounded-xl content-center flex justify-center border-2 border-foreground mr-4 has-checked:border-blue-600 has-checked:bg-blue-600">
                        <input
                            type="checkbox"
                            className="hidden basis-0"
                            checked={selectedTag == tag}
                            onChange={() => onTagClick(tag)}/>
                        <Image src={`/${tag.toLowerCase()}.png`} alt={tag} width={30} height={40} className="w-fit"/>
                    </label>
                ))}
            </div>
            <div className={`grid grid-cols-10 pl-5 pr-5`}>
                {heroes.map(hero => (
                    <HeroPickCard
                        key={hero.id}
                        dataFilter={hero.type}
                        className="outline-foreground outline-2"
                        value={hero.imageUrl}
                        size={90}
                        enabled={!(bans.includes(hero) || picks.includes(hero)) && !disabled}
                        onClick={() => onClick(hero)}
                    />
                ))}
            </div>
        </div>
    )
}