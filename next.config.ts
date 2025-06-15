import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/drafts",
    reactStrictMode: false,
    images: {
        remotePatterns: [new URL('https://dvlduuubunqdawuujpgi.supabase.co/storage/v1/object/public/**')],
        unoptimized: true,
    },
};

export default nextConfig;
