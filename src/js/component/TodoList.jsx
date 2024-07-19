import React, { useState } from 'react';

const TodoList = () => {
  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState([]);
  // Estado para almacenar la nueva tarea que se está escribiendo
  const [newTask, setNewTask] = useState('');

  // Maneja los cambios en el input de nueva tarea
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // Maneja la pulsación de teclas en el input
  const handleKeyPress = (e) => {
    // Si se presiona Enter y la tarea no está vacía
    if (e.key === 'Enter' && newTask.trim() !== '') {
      // Añade la nueva tarea al array de tareas
      setTasks([...tasks, newTask.trim()]);
      // Limpia el input
      setNewTask('');
    }
  };

  // Elimina una tarea basada en su índice
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list">
      <h1>Enter your pending tasks in the entry below</h1>
      {/* Input para añadir nuevas tareas */}
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      {/* Lista de tareas */}
      <ul>
        {tasks.length === 0 ? (
          // Mensaje cuando no hay tareas
          <li>No hay tareas, añadir tareas</li>
        ) : (
          // Mapeo de las tareas existentes
          tasks.map((task, index) => (
            <li key={index}>
              {task}
              {/* Botón para eliminar tarea */}
              <span className="delete-icon" onClick={() => deleteTask(index)}>
                ×
              </span>
            </li>
          ))
        )}
      </ul>
      {/* Contador de tareas */}
      <div className="task-count">{tasks.length} item{tasks.length !== 1 ? 's' : ''} left</div>
    </div>
  );
};

export default TodoList;