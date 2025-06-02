'use client';

import React from "react";
import {TeamBlock} from "../../components/TeamBlock";
import {CheckBox} from "../../components/CheckBox";
import {supabase} from "../../supabase/Supabase";
import {Database} from "../../supabase/schema";

type InsertDraft = Database['public']['Tables']['draft']['Insert']
type Opts = Database['public']['Tables']['draft_opts']['Insert']

export default function Create() {

    async function createDraft() {
        await supabase
            .from('drafts')
            .insert()
    }

    const [team1, setTeam1] = React.useState("")
    const [team2, setTeam2] = React.useState("")

    const opts: DraftOpts = {
        id: 0,
        isSeasonBan: false,
        mapPickBanType: 0,
        mapPickBanTime: 60,
        heroBanTime: 60,
        heroBanCount: 3
    }

    return (
        <div className="h-full w-full flex flex-col">
            <div className="grow flex flex-row justify-items-center p-8">
                <TeamBlock
                    draft={0}
                    number={1}
                    team={team1}
                    setTeam={setTeam1}
                />
                <TeamBlock
                    draft={0}
                    number={2}
                    team={team2}
                    setTeam={setTeam2}
                />
            </div>
            <div className="grow flex flex-col justify-items-center p-8">
                <CheckBox
                    label="Бан сезонных героев"
                    value={opts.isSeasonBan}
                    onValueChange={value => opts.isSeasonBan = value}
                    className="m-2"
                />

            </div>
        </div>
    )
}