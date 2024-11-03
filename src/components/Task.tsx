import {useState} from "react";
import * as React from "react";
import {Action, Activity} from "./BucketListComponent.tsx";

export default function Task({activity, dispatch}: {activity: Activity, dispatch: React.Dispatch<Action>}) {
    const [checked, setChecked] = useState<boolean>(false);
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
                {activity.text}
            </li>
        </div>
    )
}