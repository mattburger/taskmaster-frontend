import React, {useState, useEffect} from 'react';
import '../scss/app.scss';
require('dotenv').config();

const API = process.env.TASKMASTER_DEV_API;

function Task() {

  const [tasks, setTask] = useState([]);

  const _getTask = () => {

    fetch( 'http://localhost:5000/tasks', {
      mode:'cors',
    })
    .then( data => data.json() )
    .then( tasks => setTask(tasks) )
    .catch( console.error );
    console.log(API);
  };

  const _advanceTask = (e) => {
    e.preventDefault();
    let id = e.target.id;

      fetch(`http://localhost:5000/tasks/{id}`, {
      mode:'cors',
      method: 'POST',
      body: `id=${id}`,
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }

    })
    .then(data => data.json())
    .then(task => {
      setTask( task.map( (entry) => {
          return entry.id === id ? task : entry;
        }
      ));
    })
    .catch( console.error );

  };

  useEffect(_getTask, []);
  

  return (
    <ul>
      {tasks.map( (task) =>
        <li className={`task-${task.status}`} key={task.id}>
          <details>
            <summary>
              <span>{task.title}</span>
              <span id={task.id} onClick={_advanceTask}>{task.status}</span>
            </summary>
            <Details task={task} />
          </details>
        </li>
      )}
    </ul>
  )
}

function Details(props) {
  let tsk = props.task || [];
  return (
    <section>
      <div>
        <span>{tsk.description}</span>
        <span>{tsk.assignee}</span>
        <Form task={tsk} />
      </div>
    </section>
  )
}

function Form(props) {
  let tsk = props.task || [];
  return(
    <form action='http://localhost:5000/tasks/{id}/images' method="post" encType="multipart/form-data">
      <label>
        <span>Upload Image</span>
        <input type="hidden" name="id" value={tsk.id} />
        <input name="file" type="file" />
      </label>
      <button>upload</button>
    </form>
  )
}

function App() {
  return (
    <>
      <header>Tasks</header>
      <main>
        <Task />
      </main>
      <footer></footer>
      </>
  );
}

export default App;