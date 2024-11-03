import * as React from "react";
import {useState} from "react";
import {Action, Activity} from "./BucketListComponent.tsx";
// import Theme from "../types/themes.ts";
// import ThemeContext from "./ThemeContext.tsx";

export default function Task({activity, dispatch}: { activity: Activity, dispatch: React.Dispatch<Action> }) {
    const [checked, setChecked] = useState<boolean>(false);
    // const theme: Theme = useContext(ThemeContext);

    function handleCheck() {
        if (checked) {
            setChecked(false);
            dispatch({
                type: "UNDO",
                payload: activity,
            });
        } else {
            setChecked(true);
            dispatch({
                type: "COMPLETE",
                payload: activity,
            });
        }

    }

    return (
        <div className="task">
            <li
                style={{
                    textDecoration: checked ? "line-through" : "none",
                    color: checked ? "gray" : "black"

                }}>
                <input type={"checkbox"} onChange={handleCheck}></input>
                {"     " + activity.text}
            </li>
        </div>
    )
}