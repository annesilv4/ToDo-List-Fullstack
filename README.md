# 📝 ToDo List Full-Stack

Projeto desenvolvido como teste prático, com uma aplicação de lista de tarefas (ToDo List) uitlizando **FastAPI (back-end)** e **React (front-end)**.

---

## 🚀 Funcionalidades

- Adicionar tarefas
- Listar todas as tarefas
- Marcar tarefa como concluída
- Remover tarefa da lista
- Integração total entre front-end e back-end
- Deploy em produção (Railway e Vercel)

---

## 🛠️ Tecnologias Utlizadas

### Backend

- [FastAPI]
- [Uvicorn] (https://www.uvicorn.org/)
- [Python 3.10+] (https://www.python.org/)
- Hospedagem: [Railway] (https://railway.app)

### Frontend

- [React] (https://reactjs.org)
- [JavaScript (ES6+)]
- Hospedagem: [Vercel] (https://vercel.com)

---

## 🧩 Como rodar o projeto localmente

### Backend:

```bash
# Clonar o repositório
git clone https://github.com/annesilv4/ToDo-List-Fullstack.git

# Entrar na pasta do backend
cd backend

# Criar ambiente virtual (Linux/Mac)
python3 -m venv venv
source venv/bin/activate

# Ou no Windows
# python -m venv venv
# venv\Scripts\activate

# Instalar as dependências
pip install -r requirements.txt

# Rodar o servidor
uvicorn main:app --reload

# Acesse
http://localhost:8080

# Docs automáticas
http://localhost:8080/docs

```

### Frontend

```bash
# Entrar na pasta do front end
cd frontend

# Instalar as dependências
npm install

# Rodar o projeto
npm start

# Acesse
http://localhost:3000
```

---

## Links em Produção

- API (Railway): https://todo-list-fullstack-production.up.railway.app
- Frontend (Vercel): https://to-do-list-fullstack-rho.vercel.app

---

## 💡 Observações

- O projeto utiliza um "banco de dados em memória" com uma lista de tarefas (não persistente).
- O objetivo era desenvolver uma aplicação funcional do zero, com integração completa.
- CORS configurado no FastAPI para permitir consumo via frontend hospedado.

---

## 👩‍💻 Desenvolvedora

Anne Carolayne Barbosa da Silva
