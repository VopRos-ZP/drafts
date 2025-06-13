'use client';

import React, { useState } from "react";
import { CheckBox } from "@/components/CheckBox";
import { InputField } from "@/components/InputField";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { DRAFTS } from "@/supabase/schema";

export default function Create() {
    const supabase = createClient()
    const [team1, setTeam1] = useState("")
    const [team2, setTeam2] = useState("")
    const [isSeasonHeroBan, setSeasonHeroBan] = useState(false)
    const [mapPickBanType, setMapPickBanType] = useState(0)
    const [mapPickBanTime, setMapPickBanTime] = useState(60)
    const [heroBanTime, setHeroBanTime] = useState(60)
    const [heroBanCount, setHeroBanCount] = useState(3)
    const router = useRouter()

    const createDraft = async () => {
        const {data : dData} = await supabase
            .from(DRAFTS)
            .select()

        const draftId = dData!.length + 1

        const {data: draftData} = await supabase
            .from(DRAFTS)
            .insert({
                id: draftId,
                team1: team1,
                team2: team2,
                is_season_hero_ban: isSeasonHeroBan,
                map_pick_ban_type: mapPickBanType,
                map_pick_ban_time: mapPickBanTime,
                hero_ban_time: heroBanTime,
                hero_ban_count: heroBanCount,
                team1_hero_bans: [],
                team2_hero_bans: [],
                team1_hero_picks: [],
                team2_hero_picks: [],
            })
            .select()
            .limit(1)
            .single()

        router.push(`/draft/${draftData.id}`)
    }

    return (
        <div className="h-full w-full flex flex-col justify-evenly justify-items-center select-none">
            <div className="bg-blur w-2/5 rounded-4xl border-2 border-foreground p-8 self-center">
                <div>
                    <label className="flex flex-row justify-between items-center">
                        Команда 1
                        <InputField
                            placeholder={`Введите название команды 1`}
                            value={team1}
                            onChange={text => setTeam1(text)}
                            className="w-2/3 ml-4 bg-background"
                        />
                    </label>
                </div>
                <div className="mt-4">
                    <label className="flex flex-row justify-between items-center">
                        Команда 2
                        <InputField
                            placeholder={`Введите название команды 2`}
                            value={team2}
                            onChange={text => setTeam2(text)}
                            className="w-2/3 ml-4 bg-background"
                        />
                    </label>
                </div>
                <div className="mt-8">
                    <div className="grow flex flex-col justify-items-center justify-center">
                        <CheckBox
                            label="Бан сезонных героев"
                            value={isSeasonHeroBan}
                            onValueChange={value => setSeasonHeroBan(value)}
                            className="justify-between"
                        />
                        <div className="mt-4 mb-4 h-px bg-foreground"/>
                        <div className="flex flex-row justify-between justify-items-center">
                            <h1>Выбор карт</h1>
                            <div className="ml-5 w-1/3 flex flex-row border-2 rounded-lg divide-foreground divide-x-2">
                                <label
                                    className="grow-1 bg-background has-checked:bg-blue-700 rounded-tl-md rounded-bl-md text-center">
                                    <input
                                        className="hidden"
                                        type="radio"
                                        checked={mapPickBanType == 0}
                                        onChange={() => setMapPickBanType(0)}
                                    />
                                    Бан
                                </label>
                                <label
                                    className="grow-1 bg-background has-checked:bg-blue-700 rounded-tr-md rounded-br-md text-center">
                                    <input
                                        className="hidden"
                                        type="radio"
                                        checked={mapPickBanType == 1}
                                        onChange={() => setMapPickBanType(1)}
                                    />
                                    Пик
                                </label>
                            </div>
                        </div>
                        <div className="mt-4 mb-2 h-px bg-foreground"/>
                        <div className="flex flex-row justify-between justify-items-center">
                            <p className="text-center h-fit self-center">Время на выбор карты (сек)</p>
                            <InputField
                                placeholder={"Введите время (сек)"}
                                value={`${mapPickBanTime}`}
                                onChange={text => {
                                    const parsed = parseInt(text)
                                    if (isNaN(parsed)) {
                                        setMapPickBanTime(0)
                                    } else {
                                        setMapPickBanTime(parsed)
                                    }
                                }}
                                className="ml-4 w-25 text-center bg-background"
                            />
                        </div>
                        <div className="mt-2 mb-2 h-px bg-foreground"/>
                        <div className="flex flex-row justify-between justify-items-center">
                            <p className="text-center h-fit self-center">Время на выбор персонажей (сек)</p>
                            <InputField
                                placeholder={"Введите время (сек)"}
                                value={`${heroBanTime}`}
                                onChange={text => {
                                    const parsed = parseInt(text)
                                    if (isNaN(parsed)) {
                                        setHeroBanTime(0)
                                    } else {
                                        setHeroBanTime(parsed)
                                    }
                                }}
                                className="ml-4 w-25 text-center bg-background"
                            />
                        </div>
                        <div className="mt-2 mb-2 h-px bg-foreground"/>
                        <div className="flex flex-row justify-between justify-items-center">
                            <p className="text-center h-fit self-center">Количество банов на персонажей</p>
                            <InputField
                                placeholder={"Введите кол-во"}
                                value={`${heroBanCount}`}
                                onChange={text => {
                                    const parsed = parseInt(text)
                                    if (isNaN(parsed)) {
                                        setHeroBanCount(0)
                                    } else {
                                        setHeroBanCount(parsed)
                                    }
                                }}
                                className="ml-4 w-25 text-center bg-background"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <button
                    className="w-1/5 rounded-2xl border-2 border-foreground p-4 hover:border-blue-700 hover:bg-blue-700 hover:text-foreground"
                    onClick={createDraft}>
                    Создать
                </button>
            </div>
        </div>
    )
}