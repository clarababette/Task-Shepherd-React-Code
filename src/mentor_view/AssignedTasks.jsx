import TaskRow from './TaskRow';

function AssignedTasks({tasks}) {
  return (
    <div>
      Assigned Tasks
      <table>
        <thead>
          <tr>
            <th>Coder</th>
            <th>Task</th>
            <th>Status</th>
            <th>Date assigned</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignedTasks;
