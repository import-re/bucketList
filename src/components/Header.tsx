import Theme from "../types/themes.ts";
import {useContext} from "react";
import ThemeContext from "./ThemeContext.tsx";

export default function Header() {
    const theme: Theme = useContext(ThemeContext);
    const name: string = "header header-" + theme;
    return (
        <div className={name}>
            <div className="header-content">
                <img
                    src="https://images.vexels.com/media/users/3/130155/isolated/preview/67c96fecfb83c00644533fb941041eb8-duck-flat-icon.png"/>
                <a>MAIN</a>
                <a>ABOUT ME</a>
                <a>DUCKS</a>
            </div>
        </div>
    )
}