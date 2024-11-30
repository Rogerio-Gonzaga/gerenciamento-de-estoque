### README.md


# Sistema de Gerenciamento de Estoque e Vendas (GESO)

Este é um sistema simples para gerenciamento de estoque e vendas, desenvolvido para pequenos comerciantes locais que enfrentam dificuldades em realizar esse controle de forma manual. O projeto é dividido em **frontend** e **backend**, permitindo maior flexibilidade e organização.

---

## **Recursos Principais**
- Cadastro de produtos.
- Registro de vendas.
- Atualização automática do estoque após vendas.
- Relatórios simples, como total faturado e produtos mais vendidos.
- Interface intuitiva e responsiva.

---

## **Pré-requisitos**
Certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior)
- **NPM** (gerenciador de pacotes do Node.js)
- **SQLite** (para o banco de dados)
- **Navegador atualizado** (Google Chrome, Firefox, Edge, etc.)

---

## **Configuração e Execução**

### **1. Configurando o Backend**
O backend é construído com Node.js e utiliza SQLite como banco de dados.

1. Acesse o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados (se necessário):
   - Certifique-se de que o arquivo `database.sqlite` existe ou será criado automaticamente ao iniciar o servidor.

4. Inicie o servidor:
   ```bash
   npm start
   ```
   O backend estará disponível em [http://localhost:3000](http://localhost:3000).

---

### **2. Configurando o Frontend**
O frontend é desenvolvido com HTML, CSS, JavaScript e Bootstrap.

1. Acesse o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Inicie o servidor local para desenvolvimento (opcional):
   - Instale a extensão **Live Server** no seu editor de texto (como VS Code) ou use qualquer servidor local que suporte HTML estático.

3. Abra o arquivo `index.html` no navegador:
   - Utilize o seguinte comando se estiver no terminal:
     ```bash
     open index.html
     ```
   - Ou simplesmente clique duas vezes no arquivo `index.html` no explorador de arquivos.

---

## **Estrutura do Projeto**

```
.
├── backend/                # Diretório do servidor backend (Node.js + SQLite)
│   ├── controllers/        # Controladores do backend
│   ├── models/             # Modelos de dados
│   ├── routes/             # Rotas do backend
│   ├── database.sqlite     # Banco de dados SQLite
│   └── server.js           # Arquivo principal do servidor
│
├── frontend/               # Diretório do frontend (HTML + CSS + JavaScript)
│   ├── assets/             # Recursos como imagens e CSS
│   ├── index.html          # Página inicial do sistema
│   ├── styles.css          # Estilos do frontend
│   └── script.js           # Lógica do frontend
│
└── README.md               # Documentação do projeto
```

---

## **API do Backend**

### **Rotas Principais**
- **Produtos**
  - `GET /produtos`: Lista todos os produtos.
  - `POST /produtos`: Adiciona um novo produto.
  - `PUT /produtos/:id`: Atualiza informações de um produto.
  - `DELETE /produtos/:id`: Remove um produto.

- **Vendas**
  - `GET /vendas`: Lista todas as vendas.
  - `POST /vendas`: Registra uma nova venda.
