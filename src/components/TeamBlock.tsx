import React from "react";
import {InputField} from "@/components/InputField";

interface TeamBlockProps {
    number: number;
    team: string;
    setTeam: (value: string) => void;
}

export const TeamBlock: React.FC<TeamBlockProps> = ({number, team, setTeam}) => {
    return (
        <div className="flex grow flex-col items-center justify-around">
            <h1 className="text-2xl">Команда {number}</h1>
            <InputField
                placeholder={`Введите название команды ${number}`}
                value={team}
                onChange={text => setTeam(text)}
            />
        </div>
    )
}