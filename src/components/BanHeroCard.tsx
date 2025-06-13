import React from "react";
import Image from "next/image";

interface BanHeroCardProps {
    value: string;
    className?: string;
}

export const BanHeroCard: React.FC<BanHeroCardProps> = ({value, className}) => {
    return (
        <div className={`${className} h-28 w-28 rounded-lg p-2 outline-2 outline-red-600`} >
            <Image src={value} alt={value} width={100} height={100} className="rounded-lg"/>
        </div>
    )
}