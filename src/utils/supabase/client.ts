import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        "https://dvlduuubunqdawuujpgi.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2bGR1dXVidW5xZGF3dXVqcGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNDYxNDksImV4cCI6MjA1OTcyMjE0OX0.gDFxG5jpKxgzx-AGYhQP15OvfYy43p0hICMVKUkysqo"
    )
}