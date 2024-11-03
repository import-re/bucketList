import Theme from "../types/themes.ts";
import {ChangeEvent, useContext, useReducer, useState} from "react";
import ThemeContext from "./ThemeContext.tsx";
import Button from "./Button.tsx";
import Task from "./Task.tsx";

export interface Activity {
    text: string;
    done: boolean;
}

export interface Action {
    type: "ADD" | "DELETE" | "COMPLETE" | "UNDO",
    payload: Activity,
}

function activitiesReducer(state: Activity[], action: Action) {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];

        case "DELETE":
            return state.filter(activity => activity !== action.payload);

        case "COMPLETE":
            return state.map(activity =>
                activity === action.payload
                    ? { ...activity, done: true }
                    : activity
            );

        case "UNDO":
            return state.map(activity =>
                activity === action.payload
                    ? { ...activity, done: false }
                    : activity
            );

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}



export default function BucketListComponent() {
    const theme: Theme = useContext(ThemeContext);
    const [activities, dispatch] = useReducer(activitiesReducer, []);
    const [text, setText] = useState<string>("");
    const name: string = "main-component main-component-" + theme;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    return (
        <div className={name}>
            <h1 style={{color: "pink"}}>Bucket List</h1>
            <input type="text" onChange={handleChange}></input>
            <Button onClick={() => text.length > 0 ? dispatch({type: "ADD", payload: {text: text, done: false}}): 1 + 1}>
                Press me
            </Button>
            {activities ?
                <ul>
                    {activities.map((activity, index) => (
                        <Task key={index} activity={activity} dispatch={dispatch}></Task>
                    ))}
                </ul> :
                <p>Nothing to render</p>}

        </div>
    )
}