import { useEffect, useRef, useState } from "react";
import "./tasks.css";
import axios from "axios";
const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const taskRef = useRef(null);
    // const btnRef = useRef(null)
    const [isUpdate, setIsUpdate] = useState(false);

    let [upDateTaskId, setUpdateTaskId] = useState(-1);

    const [addTaskCount, setAddTaskCount] = useState(0);
    const [updateTaskCount, setUpdateTaskCount] = useState(0);
    const [deleteTaskCount, setDeleteTaskCount] = useState(0);


    useEffect(() => {
        // const url = "http://localhost:8000/api/v1/get-tasks"
        const url = "https://precily-bck.herokuapp.com/api/v1/get-tasks"
        axios.post(url).then((res) => {
            // console.log(res.data);
            setTasks(res.data.tasks);
            setAddTaskCount(res.data.addTask);
            setUpdateTaskCount(res.data.updateTask)
            setDeleteTaskCount(res.data.deleteTask)
        }).catch((err) => {
            console.log(err);
        })
    }, []);



    const addTask = () => {
        if (taskRef.current.value === "" || taskRef.current.value === null)
            alert("Please enter valid task name");
        else {
            const task = taskRef.current.value;
            // const url = "http://localhost:8000/api/v1/add-task"
            const url = "https://precily-bck.herokuapp.com/api/v1/add-task"
            taskRef.current.value = "";
            axios.post(url, { task }).then((res) => {
                // console.log(res.data);
                setTasks(res.data.tasks);
                setAddTaskCount(res.data.addTask);

            }).catch((err) => {
                console.log(err);
            })
        }
    }

    // console.log(isUpdate);


    const editTask = (id) => {
        setUpdateTaskId(id);
        taskRef.current.value = tasks[id];
        setIsUpdate(true);

    }


    const updateTask = (id) => {
        if (taskRef.current.value === "" || taskRef.current.value === null)
            alert("Please enter valid task name");
        else {
            if (upDateTaskId >= 0) {

                const task = taskRef.current.value;
                // const url = "http://localhost:8000/api/v1/update-task"
                const url = "https://precily-bck.herokuapp.com/api/v1/update-task"
                axios.post(url, { task, id }).then((res) => {
                    console.log(res.data);
                    setTasks(res.data.tasks);

                    taskRef.current.value = "";
                    setUpdateTaskCount(res.data.updateTask)
                    setUpdateTaskId(-1);
                    setIsUpdate(false)
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }

    const deleteTask = (taskId) => {
        // const url = "http://localhost:8000/api/v1/delete-task"
        const url = "https://precily-bck.herokuapp.com/api/v1/delete-task"
        axios.post(url, { taskId }).then((res) => {
            // console.log(res.data);
            setDeleteTaskCount(res.data.deleteTask)
            setTasks(res.data.tasks);
        }).catch((err) => {
            console.log(err);
        })
    }


    const reset = () => {
        // const url = "http://localhost:8000/api/v1/reset"
        const url = "https://precily-bck.herokuapp.com/api/v1/reset"
        axios.post(url).then((res) => {
            console.log(res);
            setTasks(res.data.tasks);
            setAddTaskCount(res.data.addTask);
            setUpdateTaskCount(res.data.updateTask)
            setDeleteTaskCount(res.data.deleteTask)
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className="task-container">
            {
                (tasks.length > 0)
                    ?
                    tasks.map((task, ind) => {
                        return <div key={ind} className="task" >
                            <div className="taskName" >{task}</div>

                            <div title="edit task"
                                onClick={() => { editTask(ind) }}
                                className="edit" >
                                &#9998;
                            </div>

                            <div onClick={() => deleteTask(ind)} title="delete task" className="delete" >&#10006;</div>
                        </div>
                    })
                    :
                    <h4>No task available</h4>
            }
            <center>
                <input ref={taskRef} type="text" placeholder="enter task name" />

                {
                    (isUpdate) ?
                        <button onClick={() => updateTask(upDateTaskId)} className="add-task">
                            Update
                        </button>
                        :
                        <button onClick={addTask} className="add-task">
                            Add Task
                        </button>
                }
            </center>
            <div>
                <center>API COUNT</center>
                <div className="api-count" >
                    <h6>Add Task: {addTaskCount}</h6>
                    <h6>Update Task: {updateTaskCount}</h6>
                    <h6>Delete Task: {deleteTaskCount}</h6>
                </div>
                <center>
                    <button onClick={reset} >Reset Everything</button>
                </center>
            </div>
        </div>
    );
}

export default Tasks;