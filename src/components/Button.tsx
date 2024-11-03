import Theme from "../types/themes.ts";
import {ReactNode, useContext} from "react";
import ThemeContext from "./ThemeContext.tsx";

export default function Button({ children, onClick} : {children: ReactNode, onClick: () => void}) {
    const theme: Theme = useContext(ThemeContext);
    const name: string = "button-" + theme;

    return (
        <button className={name} onClick={onClick}>
            {children}
        </button>
    )
}