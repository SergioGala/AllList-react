// Importamos las bibliotecas necesarias
import React, { useState, useEffect } from 'react';
// Importamos el archivo CSS para los estilos
import '../../styles/index.css'; // Asegúrate de que la ruta es correcta según tu estructura de carpetas

// Definimos el componente funcional TodoList
const TodoList = () => {
  // useState es un hook de React para manejar el estado en el componente
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
  const [newTask, setNewTask] = useState(''); // Estado para almacenar la nueva tarea que se va a agregar
  const [isLoading, setIsLoading] = useState(true); // Estado para saber si los datos están cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  // Definimos el nombre del usuario y la URL base de la API
  const USER_NAME = 'SergioGala';
  const API_BASE_URL = 'https://playground.4geeks.com/todo';

  // Función para cargar las tareas desde la API
  const loadTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${USER_NAME}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTasks(data); // Guardamos las tareas en el estado
    } catch (error) {
      setError(error.message); // Guardamos el mensaje de error en el estado
    } finally {
      setIsLoading(false); // Indicamos que los datos han dejado de cargar
    }
  };

  // Función para crear una nueva tarea
  const createTask = async (taskLabel) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: taskLabel, is_done: false, user_name: USER_NAME }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newTask = await response.json();
      setTasks([...tasks, newTask]); // Agregamos la nueva tarea a la lista de tareas
      setNewTask(''); // Limpiamos el campo de entrada
    } catch (error) {
      setError(error.message); // Guardamos el mensaje de error en el estado
    }
  };

  // Función para eliminar una tarea específica
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${taskId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Network response was not ok');
      setTasks(tasks.filter(task => task.id !== taskId)); // Eliminamos la tarea de la lista
    } catch (error) {
      setError(error.message); // Guardamos el mensaje de error en el estado
    }
  };

  // Función para eliminar todas las tareas
  const deleteAllTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${USER_NAME}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Network response was not ok');
      setTasks([]); // Limpiamos la lista de tareas
    } catch (error) {
      setError(error.message); // Guardamos el mensaje de error en el estado
    }
  };

  // Función para cambiar el estado de completado de una tarea
  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_done: !currentStatus }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task)); // Actualizamos la tarea en la lista
    } catch (error) {
      setError(error.message); // Guardamos el mensaje de error en el estado
    }
  };

  // useEffect se usa para ejecutar código que depende de los efectos secundarios,
  // como cargar datos cuando el componente se monta
  useEffect(() => {
    loadTasks(); // Llamamos a la función para cargar las tareas cuando el componente se monta
  }, []);

  // Renderizamos el componente
  return (
    <div className="todo-list">
      <h1>Enter your pending tasks in the entry below</h1>
      {/* Campo de entrada para agregar nuevas tareas */}
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)} // Actualizamos el estado cuando el usuario escribe
        onKeyDown={(e) => e.key === 'Enter' && newTask.trim() !== '' && createTask(newTask.trim())} // Agregamos la tarea al presionar Enter
      />
      {/* Botón para eliminar todas las tareas */}
      <button className="clear-all-button" onClick={deleteAllTasks}>
        Clear All Tasks
      </button>
      {/* Lista de tareas */}
      <ul>
        {tasks.length === 0 ? (
          <li>No hay tareas, añadir tareas</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.is_done}
                onChange={() => toggleTaskCompletion(task.id, task.is_done)} // Cambiamos el estado de la tarea al hacer clic en el checkbox
              />
              <span style={{ textDecoration: task.is_done ? 'line-through' : 'none' }}>
                {task.label}
              </span>
              <span className="delete-icon" onClick={() => deleteTask(task.id)}>
                ×
              </span>
            </li>
          ))
        )}
      </ul>
      {/* Contador de tareas restantes */}
      <div className="task-count">{tasks.length} item{tasks.length !== 1 ? 's' : ''} left</div>
    </div>
  );
};

export default TodoList; // Exportamos el componente para usarlo en otros archivos
