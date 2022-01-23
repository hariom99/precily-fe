// import Tasks from "./component/api-calls/tasks";
import DragableA from "./component/dragableA";
import DragableB from "./component/dragableB";

export default function App() {


  return (
    <div>
      <center>
        <h5>Scroll doun to see server calls</h5>
      </center>
      <DragableA />
      <DragableB />
      {/* <Tasks /> */}
    </div>
  );
}