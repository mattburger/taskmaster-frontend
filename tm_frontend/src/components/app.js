import React, {useState, useEffect} from 'react';
import './app.scss';

const API = process.env.TASKMASTER_DEV_API;

function Task() {

  const [task, setTask] = useState([]);

  const _getTask = () => {
    fetch( API, {
      mode:'cors',
    })
    .then( data => data.json() )
    .then( tsk => setTask(tsk) )
    .catch( console.error );

  };

  // const _advanceTask = (e) => {
  //   e.preventDefault();
  //   let id = e.target.id;

  //   fetch( `${API}/${id}/status`, {
  //     mode:'cors',
  //     method: 'PATCH'
  //   })
  //   .then(data => data.json())
  //   .then(task => {
  //     setTask( task.map( (entry) => {
  //         return entry.id === id ? task : entry;
  //       }
  //     ));
  //   })
  //   .catch( console.error );

  // };

  useEffect(_getTask, []);
  

  return (
    <ul>
      {task.map( (task) =>
        <li className={`task-${task.status}`} key={task.id}>
          <details>
            <summary>
              <span>{task.title}</span>
            </summary>
            <Details task={task} />
          </details>
        </li>
      )}
    </ul>
  )
}

function Details(props) {

  const _advanceTask = (e) => {
    e.preventDefault();
    let id = e.target.id;

    fetch( `${API}/${id}/status`, {
      mode:'cors',
      method: 'PATCH'
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

  
  let tsk = props.task || [];
  return (
    <section>
      {tsk.map( (item,idx) =>
        <div>
          <span>{item.description}</span>
          <span>{item.assignee}</span>
          <span id={tsk.id} onClick={_advanceTask}>{tsk.status}</span>
          {/* <span>{item.status}</span> */}
        </div>
      )}
    </section>
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