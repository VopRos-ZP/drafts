'use client'

import React, {useEffect, useState} from 'react'
import { createClient } from "@/utils/supabase/client";
import {DRAFTS} from "@/supabase/schema";
import {Draft} from "@/hooks/useDraftOpts";

export default function Draft({
    params
}: {
    params: Promise<{ id: number }>
}) {
    const supabase = createClient()

    async function fetchDraft() {
        'use server'
        const { id } = await params
        const { data } = await supabase
            .from(DRAFTS)
            .select()
            .eq('id', id)
            .limit(1)
            .single<Draft>()

        return data!
    }

    const [draft, setDraft] = useState<Draft>({
        id: 0,
        team1: "",
        team2: "",
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
    const [status, setStatus] = useState("Выбирает команда 1")

    useEffect(async () => {
        const draft = await fetchDraft()
        setDraft(draft)
    }, [fetchDraft])

    return (
        <div className="p-5 h-full w-full flex flex-col">
            <div className="grow bg-amber-700 flex flex-row justify-between">
                <div className="grow flex flex-row bg-amber-200">
                    <div className="h-16 w-16 rounded-lg outline-1 outline-red-600" >

                    </div>
                    <div className="w-4"></div>
                    <div className="h-16 w-16 rounded-lg outline-1 outline-red-600" >

                    </div>
                    <div className="w-4"></div>
                    <div className="h-16 w-16 rounded-lg outline-1 outline-red-600" >

                    </div>
                </div>
                <div className="grow bg-amber-100 flex justify-center">
                    <div className="border-2 border-blue-600">
                        <p></p>
                    </div>
                </div>
                <div className="grow bg-amber-300 flex flex-row-reverse">
                    <div className="h-16 w-16 rounded-lg outline-1 outline-red-600" >

                    </div>
                    <div className="w-4"></div>
                    <div className="h-16 w-16 rounded-lg outline-1 outline-red-600" >

                    </div>
                    <div className="w-4"></div>
                    <div className="h-16 w-16 rounded-lg outline-1 outline-red-600" >

                    </div>
                </div>
            </div>
            <div className="grow-2 bg-amber-950">

            </div>
            <div className="grow bg-blue-600">

            </div>
        </div>
    )
}
