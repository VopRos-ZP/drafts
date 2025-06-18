export const HEROES = "heroes"

export const emptyHero = "https://dvlduuubunqdawuujpgi.supabase.co/storage/v1/object/public/heroes//empty.png"

export interface Hero {
    id: string
    image_url: string
    type: string
}

export interface Draft {
    id: number
    timer: number
    turn: boolean
    type: boolean
    count: number
    maxCount: number
    sequence: string[]
    team1: string
    team2: string
    seq_index: number
    team1_hero_bans: Hero[]
    team2_hero_bans: Hero[]
    team1_hero_picks: Hero[]
    team2_hero_picks: Hero[]
}