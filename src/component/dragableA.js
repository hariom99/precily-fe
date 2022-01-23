import React, { useState } from "react";
import { Resizable } from "re-resizable";
import "./dragable.css";

const DragableA = () => {
    const [state, setState] = useState({ width: "15%", height: 600 });
    const [state2, setState2] = useState({ width: "70%", height: 600 });
    return (
        <div className="dragable-container-a" >
            <Resizable
                className="da-a"
                style={{ border: "2px solid black" }}

                size={{ width: state.width, height: state.height }}

                onResizeStop={(e, direction, ref, d) => {
                    setState({
                        width: state.width + d.width, height: state.height + d.height,
                    });
                }}>

                Sample with size

            </Resizable>

            <Resizable

                style={{ border: "2px solid black" }}

                size={{ width: state2.width, height: state2.height }}

                onResizeStop={(e, direction, ref, d) => {
                    setState2({
                        width: state2.width + d.width, height: state2.height + d.height,
                    });
                }}>

                Sample with size

            </Resizable>
        </div>
    )
}

export default DragableA;