import {useContext} from "react";
import ThemeContext from "./ThemeContext.tsx";
import Theme from "../types/themes.ts";

export default function Panel() {
    const theme: Theme = useContext(ThemeContext);
    const name: string = "panel-" + theme.toString();

    return (
        <div className={name}>
            <p>very cool website</p>
        </div>
    )
}