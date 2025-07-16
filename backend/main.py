from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Importei esse middleware para permitir o acesso de diferentes origens
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List

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
    return {"message": "Bem-vindo à API de Tarefas!"}

# Modelo de dados
class Task(BaseModel):
    id: int
    titulo: str
    concluida: bool = False

# Banco de dados (memória)
tarefas: List[Task] = []

# Listando tarefas
@app.get("/tasks")
def listar_tarefas():
    return tarefas

# Criando tarefas
@app.post("/tasks")
def criar_tarefas(nova_tarefa: Task):
    tarefas.append(nova_tarefa)
    return {"messagem": "Tarefas criandas com sucesso."}

# Marcando tarefas (concluídas)
@app.put("/tasks/{id}")
def marcar_tarefas(id: int):
    for tarefa in tarefas:
        if tarefa.id == id:
            tarefa.concluida = True
            return {"mensagem": "Tarefa concluída!"}
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
# Deletando tarefas
@app.delete("/tasks/{id}")
def deletar_tarefas(id: int):
    for tarefa in tarefas:
        if tarefa.id == id:
            tarefas.remove(tarefa)
            return {"mensagem": "Tarefa excluída com sucesso!"}
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")