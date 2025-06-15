import {useCallback, useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import {Hero, HEROES} from "@/utils/supabase/types";

export const useHeroes = () => {
    const supabase = createClient()
    const [heroes, setHeroes] = useState<Hero[]>([])

    const callback = useCallback(async () => {
        const { data } = await supabase
            .from(HEROES)
            .select()
            .overrideTypes<Hero[], { merge: false }>()
        return data!
    }, [supabase])

    useEffect(() => {
        callback().then(res => setHeroes(res))
    }, [callback])

    return heroes
}