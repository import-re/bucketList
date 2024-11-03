import Theme from "../types/themes.ts";
import {ChangeEvent, useContext, useReducer, useState} from "react";
import ThemeContext from "./ThemeContext.tsx";
import Button from "./Button.tsx";
import Task from "./Task.tsx";

export interface Activity {
    id: number,
    text: string;
    done: boolean;
}

export interface Action {
    type: "ADD" | "DELETE" | "COMPLETE" | "UNDO",
    payload: Activity,
}

function compareTo(a: Activity, b: Activity): 0 | -1 | 1 {
    if (a.done && !b.done) return 1;  // 'done' activities come first
    if (!a.done && b.done) return -1;   // 'not done' activities go later
    return 0;
}

function activitiesReducer(state: Activity[], action: Action): Activity[] {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];

        case "DELETE":
            return state.filter(activity => activity !== action.payload);

        case "COMPLETE":
            return state.map(activity =>
                activity === action.payload ? { ...activity, done: true } : activity
            );

        case "UNDO":
            return state.map(activity =>
                activity === action.payload ? { ...activity, done: false } : activity
            );

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}



export default function BucketListComponent() {
    const theme: Theme = useContext(ThemeContext);
    const [activities, dispatch] = useReducer(activitiesReducer, []);
    const [text, setText] = useState("");
    const [labelText, setLabelText] = useState("What is on your bucket list?");
    const [size, setSize] = useState(21);
    const name: string = "main-component main-component-" + theme;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    function handleClick() {
        if (text.length > 0) {
            dispatch({type: "ADD", payload: {id: Date.now(), text: text, done: false}});
            setText("");
            setLabelText("What is on your bucket list?");
            setSize(21);
        } else if (labelText.includes("Please enter an activity")){
            setLabelText(labelText + "!");
            setSize(size + 1);
        } else {
            setLabelText("Please enter an activity");
        }
    }

    return (
        <div className={name}>
            <h1 style={{color: "pink"}}>Bucket List</h1>
            <label className="label-text" style={{fontSize: `${size}px`}}>{labelText}</label>
            <input type="text" value={text} onChange={handleChange}></input>
            <Button onClick={handleClick}>
                Add activity
            </Button>
            {activities ?
                <ul className="list">
                    {activities
                        .slice()
                        .sort(compareTo)
                        .map((activity) => (
                        <Task key={activity.id} activity={activity} dispatch={dispatch}></Task>
                    ))}
                </ul> :
                <p>Nothing to render</p>}

        </div>
    )
}