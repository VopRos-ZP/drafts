export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    public: {
        Tables: {
            draft: {
                id: number
                team1: string
                team2: string
                opts: number,
                team_drafts: number
            }
            draft_opts: {
                Row: {
                    id: number
                    is_season_ban: boolean
                    map_pick_ban_type: number
                    map_pick_ban_time: number
                    hero_ban_time: number
                    hero_ban_count: number
                }
                Insert: {
                    id: number
                    is_season_ban: boolean
                    map_pick_ban_type: number
                    map_pick_ban_time: number
                    hero_ban_time: number
                    hero_ban_count: number
                }
                Update: {
                    id: number
                    is_season_ban: boolean
                    map_pick_ban_type: number
                    map_pick_ban_time: number
                    hero_ban_time: number
                    hero_ban_count: number
                }
            }
            team_drafts: {

            }
        }
    }
}