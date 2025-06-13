'use client'

import React, {use, useCallback, useEffect, useState} from 'react'
import { createClient } from "@/utils/supabase/client";
import {DRAFTS, Hero, HEROES} from "@/supabase/schema";
import {Draft} from "@/hooks/useDraftOpts";
import {useSearchParams} from "next/navigation";
import {BanHeroCard} from "@/components/BanHeroCard";
import {HeroPickColumn} from "@/components/HeroPickColumn";
import {HeroesList} from "@/components/HeroesList";

export default function DraftPage({
    params
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = use(params)
    const searchParams = useSearchParams()
    const supabase = createClient()

    //const team = searchParams.get("team")

    const [draft, setDraft] = useState<Draft>({
        id: 0,
        team1: "",
        team2: "",
        timer: 60,
        turn: 1,
        is_season_hero_ban: false,
        map_pick_ban_type: 0,
        map_pick_ban_time: 60,
        hero_ban_time: 60,
        hero_ban_count: 3,
        team1_hero_bans: [],
        team1_hero_picks: [],
        team2_hero_bans: [],
        team2_hero_picks: []
    })
    const [heroes, setHeroes] = useState<Hero[]>([])
    const [status, setStatus] = useState("Выбирает команда 1")

    const startTimer = useCallback(async () => {

    }, [])

    const listenDraftChanges = useCallback(() => {
        supabase
            .channel('draft' + id)
            .on('postgres_changes', { event: '*', schema: 'public', table: DRAFTS }, payload => {
                setDraft(payload.new as Draft)
            })
            .subscribe()
    }, [id, supabase])

    const fetchDraftCallback = useCallback(async () => {
        const { data } = await supabase
            .from(DRAFTS)
            .select()
            .eq('id', id)
            .limit(1)
            .single<Draft>()
        return data!
    }, [id, supabase])

    const fetchHeroesCallback = useCallback(async () => {
        const { data } = await supabase
            .from(HEROES)
            .select()
            .overrideTypes<Hero[], { merge: false }>()
        return data!
    }, [supabase])

    useEffect(() => {
        listenDraftChanges()
        fetchDraftCallback().then(d => setDraft(d))
        fetchHeroesCallback().then(res => setHeroes(res))
    }, [listenDraftChanges, fetchDraftCallback, fetchHeroesCallback])

    const range = (start: number, end: number): number[] => {
        return Array.from(Array(end - start).keys()).map((i) => i + start);
    };

    const bans = range(0, draft.hero_ban_count)

    const [timer, setTimer] = useState("")

    useEffect(() => {
        let result = ""
        const minutes = Math.floor(draft.timer / 60)
        const seconds = draft.timer % 60
        if (minutes < 10) {
            result += "0" + minutes
        } else {
            result += minutes
        }
        result += ":"
        if (seconds < 10) {
            result += "0" + seconds
        } else {
            result += seconds
        }
        setTimer(result)
    }, [draft]);
    
    return (
        <div className="h-full w-full flex flex-col select-none">
            <div className="pb-8 flex flex-row justify-between">
                <div className="grow flex flex-row justify-evenly items-center">
                    {bans.map(i => (
                        <BanHeroCard
                            key={i}
                            value="https://dvlduuubunqdawuujpgi.supabase.co/storage/v1/object/public/heroes/shortgun/arnie.png"
                            className=""
                        />
                    ))}
                </div>
                <div className="grow-5 flex flex-col items-center">
                    <div className="w-fit p-1 rounded-md h-fit mb-2">
                        <p className="text-green-600 text-6xl">{timer}</p>
                    </div>
                    <div className="w-fit p-4 rounded-xl border-2 border-red-600 h-fit">
                        <p className="text-red-600 text-2xl">{status}</p>
                    </div>
                </div>
                <div className="grow flex flex-row justify-evenly items-center">
                    {bans.map(i => (
                        <BanHeroCard
                            key={i}
                            value="https://dvlduuubunqdawuujpgi.supabase.co/storage/v1/object/public/heroes/shortgun/arnie.png"
                            className=""
                        />
                    ))}
                </div>
            </div>
            <div className="pb-4 grow flex flex-row justify-evenly">
                <HeroPickColumn
                    value={range(0, 5)}
                    borderColor="border-blue-600"
                    className="border-blue-600"
                />
                <HeroesList
                    value={heroes.sort((a, b) => a.name.localeCompare(b.name))}
                    tags={['SHORTGUN', 'SCOUT', 'SNIPER', 'TANK', 'TROOPER']}
                />
                <HeroPickColumn
                    value={range(0, 5)}
                    borderColor="border-red-600"
                    className="border-red-600"
                />
            </div>
            <div className="grow flex justify-center">
                <div>
                    <button
                        disabled={true}
                        onClick={() => {}}
                        className="pt-2 pb-2 pl-6 pr-6 border-2 rounded-xl text-xl border-foreground disabled:opacity-25 enabled:hover:border-blue-700 enabled:hover:bg-blue-700 hover:text-foreground">
                        Выбрать
                    </button>
                </div>
            </div>
        </div>
    )
}
