from fastapi import FastAPI # Importei o FAastAPI para criar a API
from fastapi.middleware.cors import CORSMiddleware # Importei esse middleware para permitir o acesso de diferentes origens
from fastapi import HTTPException # Importei o HTTPException para tratar os erros
from pydantic import BaseModel # Importei o BaseModel para definir os modelos de dados
from typing import List # Importei List para trabalhar com listas de tarefas

# Criação da instância do FastAPI
app = FastAPI()

# Aqui é a configuração do CORS, que permite que a API seja acessada de qualquer origem.
app.add_middleware (
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rota inicial
@app.get("/")
def home():
    # Mensagem de boas-vindas
    return {"message": "Bem-vindo à API de Tarefas!"}

# Modelo de dados
class Task(BaseModel):
    id: int # Atributo id para identificar a tarefa
    titulo: str # Atributo titulo para o nome da tarefa
    concluida: bool = False # Atributo concluida para indicar se a tarefa foi concluída, padrão é False

# Banco de dados (memória)
tarefas: List[Task] = [] # Lista para armazenar as tarefas

# Listando tarefas
@app.get("/tasks")
def listar_tarefas():
    return tarefas # Retorna a lista de tarefas

# Criando tarefas
@app.post("/tasks")
def criar_tarefas(nova_tarefa: Task):
    tarefas.append(nova_tarefa) # Adiciona a nova tarefa à lista de tarefas
    return {"messagem": "Tarefas criandas com sucesso."} # Mensagem de sucesso

# Marcando tarefas (concluídas)
@app.put("/tasks/{id}")
def marcar_tarefas(id: int):
    for tarefa in tarefas:
        if tarefa.id == id: # Verifica se a tarefa com o id fornecido existe
            tarefa.concluida = True # Marca a tarefa como concluída
            return {"mensagem": "Tarefa concluída!"} # Mensagem de sucesso
        raise HTTPException(status_code=404, detail="Tarefa não encontrada") # Mensagem de erro se a tarefa não for encontrada
    
# Deletando tarefas
@app.delete("/tasks/{id}")
def deletar_tarefas(id: int):
    for tarefa in tarefas:
        if tarefa.id == id: # Verifica se a tarefa com o id fornecido existe
            tarefas.remove(tarefa) # Remove a tarefa da lista
            return {"mensagem": "Tarefa excluída com sucesso!"} # Mensagem de sucesso
        raise HTTPException(status_code=404, detail="Tarefa não encontrada") # Mensagem de erro se a tarefa não for encontrada