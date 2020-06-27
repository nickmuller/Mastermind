import React from 'react';
import { Colour } from "../api/Client";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    colour: Colour | null;
    active?: boolean;
}

export function Pin({ colour, active, ...props }: Props) {
    const className = [
        "btn",
        "pin",
        colour,
        active ? "active" : ""
    ];

    return (
        <button className={className.join(" ")} {...props} />
    );
}