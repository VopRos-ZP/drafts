'use client'

import React, {useState} from 'react'
import {BanHeroCard} from "@/components/BanHeroCard";
import {HeroPickColumn} from "@/components/HeroPickColumn";
import {HeroesList} from "@/components/HeroesList";
import {useHeroes} from "@/hooks/useHeroes";
import {Draft, emptyHero, Hero} from "@/utils/supabase/types";
import {useTimer} from "@/shared/hooks";

const defaultDraft = {
    id: 0,
    team1: "",
    team2: "",
    timer: 60,
    turn: true, // true - 1 / false - 2
    type: true, // true - ban / false - pick
    count: 0,
    maxCount: 1,
    sequence: [
        "true-1", "true-2",
        "false-1", "false-2",
        "false-2", "false-1",
        "true-2", "true-1",
        "false-2", "false-2",
    ],
    seq_index: 0,
    hero_lock: null,
    team1_hero_bans: [],
    team1_hero_picks: [],
    team2_hero_bans: [],
    team2_hero_picks: [],
}

export default function Home() {
    const heroes = useHeroes()
    const [draft, setDraft] = useState<Draft>(defaultDraft)
    const [disabled, setDisabled] = useState(false)
    const [status, setStatus] = useState("Банит команда 1")
    const seconds = 60

    const range = (start: number, end: number): number[] => {
        return Array.from(Array(end - start).keys()).map((i) => i + start);
    };

    const bans = range(0, 3)

    function updateStatus() {
        setStatus(`${draft.type ? 'Банит' : 'Выбирает'} команда ${draft.turn ? 1 : 2}`)
    }

    const turn = () => {
        if (draft.sequence.length > draft.seq_index + 1) {
            const seq = draft.sequence[draft.seq_index + 1].split('-')
            draft.count = 0
            draft.maxCount = parseInt(seq[1])
            draft.type = seq[0] == "true"
            draft.turn = !draft.turn
            draft.seq_index++
            setDraft(draft)
            updateStatus()
            timer.restart(seconds)
        } else {
            timer.pause()
            setDisabled(true)
        }
    }

    function onHeroClick(hero: Hero) {
        draft.hero_lock = hero
        setDraft(draft)
    }

    function onSelectButtonClick() {
        if (draft.type) {
            if (draft.turn) {
                draft.team1_hero_bans.push(draft.hero_lock!)
            } else {
                draft.team2_hero_bans.push(draft.hero_lock!)
            }
        } else {
            if (draft.turn) {
                draft.team1_hero_picks.push(draft.hero_lock!)
            } else {
                draft.team2_hero_picks.push(draft.hero_lock!)
            }
        }
        draft.hero_lock = null
        if ((draft.count + 1) == draft.maxCount) {
            turn()
        } else {
            draft.count++
            setDraft(draft)
        }
    }

    const timer = useTimer(seconds, {
        immediately: true,
        onStart: () => {
            const seq = draft.sequence[draft.seq_index].split('-')
            draft.count = 0
            draft.maxCount = parseInt(seq[1])
            draft.type = Boolean(seq[0])
            draft.turn = true
            setDraft(draft)
        },
        onExpire: () => {
            if (!draft.type) {
                for (let i = draft.count; i < draft.maxCount; i++) {

                }
                if (draft.hero_lock == null) {
                    const arr = heroes.filter((h) => {
                        return !draft.team1_hero_bans.includes(h) &&
                            !draft.team1_hero_picks.includes(h) &&
                            !draft.team2_hero_bans.includes(h) &&
                            !draft.team2_hero_picks.includes(h)
                    })
                    draft.hero_lock = arr[Math.floor(Math.random() * arr.length)]
                    setDraft(draft)
                }
                onSelectButtonClick()
            }
            turn()
        }
    })

    return (
        <div className="h-full w-full flex flex-col select-none">
            <div className="pb-8 flex flex-row justify-between">
                <div className="grow flex flex-col">
                    <div className="grow-0 self-center mb-4 mt-4 text-xl">
                        Баны от команды 1
                    </div>
                    <div className="grow flex flex-row justify-evenly place-content-center">
                        {bans.map(i => (
                            <BanHeroCard
                                key={i}
                                value={draft.team1_hero_bans.length > i ? draft.team1_hero_bans[i].image_url : emptyHero}
                                className=""
                                size={90}
                            />
                        ))}
                    </div>
                </div>
                <div className="grow-5 p-4 flex flex-col items-center">
                    <div className="grow w-fit p-1 rounded-md h-fit mb-2">
                        <p className="text-green-600 text-6xl">
                            {String(timer.minutes).padStart(2, '0')}
                            :
                            {String(timer.seconds).padStart(2, '0')}
                        </p>
                    </div>
                    <div className="grow w-fit p-4 rounded-xl border-2 h-fit">
                        <p className="text-5xl">{status}</p>
                    </div>
                </div>
                <div className="grow flex flex-col">
                    <div className="grow-0 self-center mb-4 mt-4 text-xl">
                        Баны от команды 2
                    </div>
                    <div className="grow flex flex-row-reverse justify-evenly place-content-center">
                        {bans.map(i => (
                            <BanHeroCard
                                key={i}
                                value={draft.team2_hero_bans.length > i ? draft.team2_hero_bans[i].image_url : emptyHero}
                                className=""
                                size={90}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="pb-4 grow flex flex-row justify-evenly">
                <div className="grow-0 flex flex-col">
                    <div className="grow-0 self-center mb-4 text-xl">
                        Команда 1
                    </div>
                    <HeroPickColumn
                        value={range(0, 5)}
                        picks={draft.team1_hero_picks}
                        borderColor="blue-600"
                        className="border-blue-600"
                    />
                </div>
                <HeroesList
                    value={heroes}
                    lock={draft.hero_lock}
                    bans={draft.team1_hero_bans.concat(draft.team2_hero_bans)}
                    picks={draft.team1_hero_picks.concat(draft.team2_hero_picks)}
                    tags={['SHORTGUN', 'SCOUT', 'SNIPER', 'TANK', 'TROOPER']}
                    onClick={onHeroClick}
                    disabled={disabled}
                />
                <div className="grow-0 flex flex-col">
                    <div className="grow-0 self-center mb-4 text-xl">
                        Команда 2
                    </div>
                    <HeroPickColumn
                        value={range(0, 5)}
                        picks={draft.team2_hero_picks}
                        borderColor="red-600"
                        className="border-red-600"
                    />
                </div>
            </div>
            <div className="grow flex justify-center">
                <div>
                    <button
                        disabled={draft.hero_lock == null}
                        onClick={onSelectButtonClick}
                        className="pt-2 pb-2 pl-6 pr-6 border-2 rounded-xl text-xl border-foreground disabled:opacity-25 enabled:hover:border-blue-700 enabled:hover:bg-blue-700 hover:text-foreground">
                        Выбрать
                    </button>
                </div>
            </div>
        </div>
    )
}
