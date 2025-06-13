
import {DRAFTS} from "@/supabase/schema";
import {createClient} from "@/utils/supabase/client";

export interface Draft {
    id: number
    timer: number
    turn: number
    team1: string
    team2: string
    is_season_hero_ban: boolean
    map_pick_ban_type: number
    map_pick_ban_time: number
    hero_ban_time: number
    hero_ban_count: number
    team1_hero_bans: number[]
    team2_hero_bans: number[]
    team1_hero_picks: number[]
    team2_hero_picks: number[]
}

export const useDraft = async (id: number) => {
    const supabase = createClient()
    const { data } = await supabase
        .from(DRAFTS)
        .select()
        .eq('id', id)
        .limit(1)
        .single<Draft>()

    return data!
}