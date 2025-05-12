import React, { useState } from 'react';
import './ToDoList.css';

function ToDoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  // Handle form submission for adding a task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  // Handle editing a task
  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: editText } : task
    ));
    setEditing(null);
    setEditText('');
  };

  // Toggle task completion status
  const toggleCompletion = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={task}
          onChange={handleChange}
          className="todo-input"
          placeholder="Add a new task"
        />
        <button type="submit" className="todo-submit">Add Task</button>
      </form>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            {editing === task.id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  placeholder="Edit task"
                />
                <button onClick={() => handleEditSubmit(task.id)} className="todo-submit">Save</button>
              </div>
            ) : (
              <>
                <span onClick={() => toggleCompletion(task.id)} className="todo-text">
                  {task.text}
                </span>
                <button onClick={() => setEditing(task.id)} className="todo-edit">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="todo-delete">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
