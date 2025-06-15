import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [new URL('https://dvlduuubunqdawuujpgi.supabase.co/storage/v1/object/public/**')],
    },
};

export default nextConfig;
