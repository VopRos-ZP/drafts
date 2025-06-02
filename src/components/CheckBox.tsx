import React from "react";

interface CheckBoxProps {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    className?: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({label, value, onValueChange, className}) => {
    return (
        <div className={`flex justify-items-center ${className}`}>
            <input
                className="mr-5 w-6 h-6 appearance-none border-2 rounded-sm border-foreground accent-blue-700 checked:bg-blue-700 checked:border-blue-700"
                type="checkbox"
                checked={value}
                onChange={ () => onValueChange(!value) }
            />
            <label>{label}</label>
        </div>
    )
}