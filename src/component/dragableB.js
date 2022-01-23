import React, { useState } from "react";
import { Resizable } from "re-resizable";
import "./dragable.css";
import Tasks from "./api-calls/tasks";

const DragableB = () => {
    const [state, setState] = useState({ width: "88%" });
    return (
        <div className="dragable-container-b" >
            <Resizable
                className="da-a"
                style={{ border: "2px solid black" }}

                size={{ width: state.width, height: state.height }}

                onResizeStop={(e, direction, ref, d) => {
                    setState({
                        width: state.width + d.width, height: state.height + d.height,
                    });
                }}>

                <Tasks />

            </Resizable>
        </div>
    )
}

export default DragableB;