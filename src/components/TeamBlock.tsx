import React from "react";
import {InputField} from "./InputField";

interface TeamBlockProps {
    draft: number;
    number: number;
    team: string;
    setTeam: (value: string) => void;
}

export const TeamBlock: React.FC<TeamBlockProps> = ({draft, number, team, setTeam}) => {
    const link = `http://localhost:3000/draft/${draft}&team${number}`
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