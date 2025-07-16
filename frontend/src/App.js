// Importando useState do React
import { useState, useEffect } from "react";

function App() {
  const [titulo, setTitulo] = useState("");
  const [tarefas, setTarefas] = useState([]);

  const apiURL = "https://todo-list-fullstack-production.up.railway.app"

  // Função para buscar as tarefas do backend
  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = async () => {
    try {
      const resposta = await fetch(`${apiURL}/tasks`);
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaTarefa = {
      id: Date.now(), // Gerando um ID único baseado no timestamp
      titulo: titulo,
      concluida: false,
    };

    try {
      const resposta = await fetch(`${apiURL}/tasks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(novaTarefa),
      });

      if (resposta.ok) {
        setTitulo("");
        buscarTarefas(); // Atualizando a lista de tarefas
      } else {
        alert("Erro ao adicionar a tarefa.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro na conexão com o servidor.");
    }
  };

  const concluirTarefa = async (id) => {
    try {
      const resposta = await fetch(`${apiURL}/tasks/${id}`, {
        method: "PUT",
      });

      if (resposta.ok) {
        buscarTarefas(); // Atualizando a lista de tarefas
      } else {
        alert("Erro ao concluir tarefa.");
      }
    } catch (erro) {
      console.error("Erro na conclusão da tarefa:", erro);
    }
  };

  const excluirTarefa = async (id) => {
    try {
      const resposta = await fetch(`${apiURL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        buscarTarefas(); // Atualizando a lista de tarefas
      } else {
        alert("Erro ao excluir tarefa.");
      }
    } catch (erro) {
      console.error("Erro na exclusão da tarefa:", erro);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Digite o título da tarefa" required />
        <button type="submit">Adicionar Tarefa</button>
      </form>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.titulo} {tarefa.concluida ? "Concluída" : "Pendente"}
            {!tarefa.concluida && (
              <button style={{ marginLeft: "20px" }} onClick={() => concluirTarefa(tarefa.id)}>Concluir</button>
            )}
            <button style={{ marginLeft: "20px" }} onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


// Exportando a função App
export default App;