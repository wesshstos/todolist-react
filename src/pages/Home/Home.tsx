import { useState } from "react"

interface Task {
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}


function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("")
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("low")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  const addTask = (): void => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false, priority: newPriority }]);
      setNewTask("");
      setNewPriority("low") //resetar para baixa priorida
    }
  };

  const toggleTask = (index: number): void => {
    const updateTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updateTasks);
  };

  const deleteTask = (index: number): void => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((task) =>{
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true; // Para o filtro "all"
  })

  return (
    <div className=" max-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-4xl font-black text-center mb-4 uppercase">To-Do List</h1>
        <div className="flex mb-4">
          <input type="text"
            className="border rounded-l-lg p-2 w-full outline-none"
            placeholder="Adicione nova tarefa..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <select onChange={(e) => setNewPriority(e.target.value as "low" | "medium" | "high")} value={newPriority} className="outline-none border p-2 mx-4">
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>

          <button
            className="bg-blue-500 text-white p-2 rounded-r-lg outline-none"
            onClick={addTask}>
            Adicionar
          </button>
        </div>
        <div className="my-4 ">
          <input type="text"
            className="border p-2 w-full rounded-lg outline-none"
            placeholder="Pesquisar tarefas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex justify-around my-4">
            <button className={`p-2 rounded-lg ${filter === "all" ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => setFilter("all")}>
              Todas
            </button>
            <button className={`p-2 rounded-lg ${filter === "completed" ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => setFilter("completed")}>
              Completas
            </button>
            <button className={`p-2 rounded-lg ${filter === "pending" ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => setFilter("pending")}>
              Pendentes
            </button>
          </div>
        </div>
        <ul>
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center mb-2 p-2 border rounded bg-white shadow animation-fadeIn ${task.completed ? "bg-green-200 line-through" : ""}`}>
              <span onClick={() => toggleTask(index)}>{task.text}</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-white ${task.priority === "low" ? "bg-blue-500" : task.priority === "medium" ? "bg-yellow-400" : "bg-red-500"}`}>
                {task.priority === "low" ? "Baixa" : task.priority === "medium" ? "Média" : "Alta"}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition duration-700 delay-50">
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home;