import Theme from "../types/themes.ts";
import {createContext} from "react";

const ThemeContext = createContext(Theme.LIGHT);
export default ThemeContext;