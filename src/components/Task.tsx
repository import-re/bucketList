import * as React from "react";
import { useState } from "react";
import { Action, Activity } from "./BucketListComponent.tsx";

export default function Task({ activity, dispatch }: { activity: Activity; dispatch: React.Dispatch<Action> }) {
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
                    color: checked ? "gray" : "black",
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" onChange={handleCheck} />
                    {" " + activity.text}
                </div>
                <button
                    style={{
                        border: 'none',
                        background: 'none',
                        color: 'red',
                        fontSize: '18px',
                        cursor: 'pointer',
                        marginLeft: '10px'
                    }}
                    onClick={() => dispatch({ type: "DELETE", payload: activity })}
                >
                    &times;
                </button>
            </li>
        </div>
    );
}
