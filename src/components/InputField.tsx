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
            className={`${className} p-4 rounded-xl outline-0 border-1`}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    )
}
