import './App.css'
import ThemeContext from "./components/ThemeContext.tsx";
import {useState} from "react";
import Theme from "./types/themes.ts";
import Button from "./components/Button.tsx";
import Header from "./components/Header.tsx";
import BucketListComponent from "./components/BucketListComponent.tsx";


function App() {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

    function handleClick() {
        if (theme === Theme.LIGHT) {
            setTheme(Theme.DARK);
        } else {
            setTheme(Theme.LIGHT);
        }
    }

    return (
        <>
            <ThemeContext.Provider value={theme}>
                <div className={`inner-wrapper inner-${theme}`}>
                    <Header/>
                    <BucketListComponent/>
                    <Button onClick={handleClick}>Toggle theme</Button>
                </div>
            </ThemeContext.Provider>
        </>
    )
}

export default App;
