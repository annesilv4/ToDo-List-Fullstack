// Importando useState do React
import { useState, useEffect } from "react";

// Função principal do aplicativo
function App() {
  const [titulo, setTitulo] = useState(""); // Estado para armazenar o título da tarefa
  const [tarefas, setTarefas] = useState([]); // Estado para armazenar a lista de tarefas

  const apiURL = "https://todo-list-fullstack-production.up.railway.app" // URL da API do backend

  // Função para buscar as tarefas do backend
  useEffect(() => {
    buscarTarefas();
  }, []);

  // Função para buscar as tarefas do backend
  const buscarTarefas = async () => {
    try {
      const resposta = await fetch(`${apiURL}/tasks`); // Fazendo uma requisição GET para a API
      const dados = await resposta.json(); // Conversão da resposta para JSON
      setTarefas(dados); // Atualizando o estado com as tarefas recebidas
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error); // Tratamento de erro quando a requisição falhar
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Criando um objeto novaTarefa com os dados da tarefa
    const novaTarefa = {
      id: Date.now(), // Gerando um ID único baseado no timestamp
      titulo: titulo, // Título da tarefa
      concluida: false, // Status da conclusão da tarefa, padrão é false
    };

    // Enviando a nova tarefa para o backend
    try {
      const resposta = await fetch(`${apiURL}/tasks`, {
        method: "POST", // Método POST para criar uma nova tarefa
        headers: {
          "Content-type": "application/json" // Definindo o cabeçalho Content-Type como JSON
        },
        body: JSON.stringify(novaTarefa), // Convertendo o objeto novaTarefa para uma string JSON
      });

      // Verificando se a resposta foi bem-sucedida
      if (resposta.ok) {
        setTitulo(""); // Limpando o campo de entrada após adicionar a tarefa
        buscarTarefas(); // Atualizando a lista de tarefas
      } else {
        alert("Erro ao adicionar a tarefa."); // Exibindo um alerta se houver erro ao adicionar a tarefa
      }
    } catch (error) { // Tratamento de erro quando a requisição falhar
      console.error("Erro:", error); // Exibindo o erro no console
      alert("Erro na conexão com o servidor."); // Exibindo um alerta se houver erro na conexão com o servidor
    }
  };

  // Funções para concluir tarefas
  const concluirTarefa = async (id) => {
    try {
      const resposta = await fetch(`${apiURL}/tasks/${id}`, { // Fazendo uma requisição PUT para atualizar a tarefa
        method: "PUT", // Método PUT para atualizar a tarefa
      });

      if (resposta.ok) { // Verificando se a resposta foi bem-sucedida
        buscarTarefas(); // Atualizando a lista de tarefas
      } else {
        alert("Erro ao concluir tarefa."); // Exibindo um alerta se houver erro ao concluir a tarefa
      }
    } catch (erro) {
      console.error("Erro na conclusão da tarefa:", erro); // Tratamento de erro se falhar a conclusão
    }
  };

  // Função para excluir tarefas
  const excluirTarefa = async (id) => {
    try {
      // Fazendo uma requisição DELETE para excluir a tarefa
      const resposta = await fetch(`${apiURL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) { // Verificando se a resposta foi bem-sucedida
        buscarTarefas(); // Atualizando a lista de tarefas
      } else {
        alert("Erro ao excluir tarefa."); // Exibindo um alerta se houver erro ao excluir a tarefa
      }
    } catch (erro) {
      console.error("Erro na exclusão da tarefa:", erro); // Tratamento de erro se falhar a exlusão
    }
  };

  // Renderizando o componente
  return (
    <div style={{ padding: "20px" }}>
      {/* Título do aplicativo e formulário para adicionar tarefas */}
      <h1>ToDo List</h1>
      {/* Formulário para adicionar nova tarefa*/}
      <form onSubmit={handleSubmit}>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Digite o título da tarefa" required />
        <button type="submit">Adicionar Tarefa</button> {/* Botão para enviar o formulário */}
      </form>

      {/* Lista de tarefas adicionadas */}
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {/* Exibindo o título da tarefa e seu status */}
            {tarefa.titulo} {tarefa.concluida ? "Concluída" : "Pendente"}
            {/* Botões para concluir e excluir a tarefa */}
            {!tarefa.concluida && (
              <button style={{ marginLeft: "20px" }} onClick={() => concluirTarefa(tarefa.id)}>Concluir</button> // Botão para concluir a tarefa se ela não estiver concluída
            )}
            <button style={{ marginLeft: "20px" }} onClick={() => excluirTarefa(tarefa.id)}>Excluir</button> {/* Botão para excluir a tarefa */}
          </li>
        ))}
      </ul>
    </div>
  );
}


// Exportando a função App
export default App;