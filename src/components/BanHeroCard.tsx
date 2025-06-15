import React from "react";
import Image from "next/image";

interface BanHeroCardProps {
    value: string;
    className?: string;
    size?: number;
}

export const BanHeroCard: React.FC<BanHeroCardProps> = ({value, className, size}) => {
    if (size == null) {
        size = 100
    }
    return (
        <div className={`${className} w-fit h-fit rounded-lg p-2 outline-2 outline-red-600`} >
            <Image src={value} alt={value} width={size} height={size} className="rounded-lg"/>
        </div>
    )
}