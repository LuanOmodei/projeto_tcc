# 🌐 Backend do Projeto de Cardápio Digital

![Node.js](https://img.shields.io/badge/Node.js-v16.13.0-green)
![Express](https://img.shields.io/badge/Express-4.17.1-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14.1-lightblue)
![License](https://img.shields.io/github/license/LuanOmodei/projeto_tcc)

## 📋 Descrição

Esta pasta contém o backend do aplicativo de cardápio digital, desenvolvido com **Node.js** e **Express**. O backend é responsável por gerenciar a comunicação com o banco de dados **PostgreSQL**, fornecendo APIs RESTful para a gestão de itens de cardápio, categorias e autenticação de usuários.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript server-side.
- **Express** - Framework para criação de APIs em Node.js.
- **PostgreSQL** - Banco de dados relacional utilizado para armazenar informações dos cardápios.

## 📂 Estrutura do Projeto

```plaintext
Backend/
├── controllers/      # Lógica de controle das APIs
├── models/           # Definição dos modelos de dados
├── routes/           # Rotas da API
├── db.js             # Configuração Database
├── index.js          # Ponto de entrada da aplicação
└── README.md         # Documentação do backend
```
## 🛠️ Como Executar o Backend
**Pré-requisitos**
- Node.js e npm instalados

- PostgreSQL configurado

**Instalação:**

1. Acesse a pasta do backend:
```
cd Backend
```

2. Instale as dependências:
```
npm install
```
3. Configure o arquivo db.js com suas credenciais do PostgreSQL:
```
HOST=localhost
PORT=5432
USER=seu_usuario
PASSWORD=sua_senha
DATABASE=seu_banco_de_dados
```
**Execução**

1. Inicie o servidor backend:
```
npm start
```
2. A API estará disponível em: http://localhost:3000

## 📜 Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

<p align="center"> Desenvolvido com ❤️ por <a href="https://github.com/LuanOmodei">Luan Omodei</a> </p>
