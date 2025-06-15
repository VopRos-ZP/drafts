import React from "react";
import Image from "next/image";

interface HeroPickCardProps {
    value: string;
    dataFilter?: string;
    size?: number;
    className?: string;
    enabled?: boolean;
    onClick: () => void;
}

export const HeroPickCard: React.FC<HeroPickCardProps> = ({value, dataFilter, size, className, enabled, onClick}) => {
    if (enabled == null) {
        enabled = false
    }
    if (size == null) {
        size = 100
    }
    return (
        <div
            aria-disabled={!enabled}
            data-filter={dataFilter}
            className={`${className} size-max rounded-lg p-2 m-2 ${enabled ? 'outline-green-600' : 'outline-red-700 opacity-25'}`}
            onClick={() => enabled ? onClick() : {} }>
            <Image src={value} alt={value} width={size} height={size} className="rounded-lg"/>
        </div>
    )
}