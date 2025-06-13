import React from "react";
import Image from "next/image";

interface HeroPickCardProps {
    value: string;
    dataFilter?: string;
    size?: number;
    className?: string;
}

export const HeroPickCard: React.FC<HeroPickCardProps> = ({value, dataFilter, size, className}) => {
    if (size == null) {
        size = 100
    }
    return (
        <div
            data-filter={dataFilter}
            className={`${className} size-max rounded-lg p-2 outline-2 m-2`} >
            <Image src={value} alt={value} width={size} height={size} className="rounded-lg"/>
        </div>
    )
}