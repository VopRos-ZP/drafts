import { supabase } from "../supabase/Supabase";
import {Database} from "../supabase/schema";
import React from 'react'

type Opts = Database['public']['Tables']['draft_opts']['Row']

export const useDraftOpts = (id: number) => {
    const [opts, setOpts] = React.useState<Opts[]>([])

    React.useEffect(() => {
        const fetchOpts = async () => {
            const { data: opts, error } = await supabase
                .from('draft_opts')
                .select('*')
                .limit(1)

            if (error) console.log('error', error)
            else setOpts(opts)
        }
        fetchOpts().then()
    }, [supabase])
    return opts
}