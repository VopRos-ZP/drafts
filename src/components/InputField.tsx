import React from "react";

interface InputFieldProps {
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
    className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({placeholder, value, onChange, className}) => {
    return (
        <input
            className={`${className} p-4 w-2/3 rounded-xl border-2`}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    )
}
