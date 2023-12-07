<p align="center">
   <img src="preview.png" alt="andrezabiquinis" width="480px"/>
</p>

<h1 align="center">Andreza Moda Praia</h1>

<h3 align="center">
  :rocket: Vitrine de produtos para uma vendedora local de biquínis. 👙
</h3>


# :computer: Tecnologias

Este projeto foi feito utilizando as seguintes tecnologias:

### Front-end
* [axios](https://github.com/axios/axios)
* [embla-carousel-react](https://github.com/davidcetinkaya/embla-carousel-react)
* [Firebase](https://firebase.google.com/)
* [React](https://reactjs.org/)
* [react-hot-toast](https://react-hot-toast.com/)
* [react-icons](https://react-icons.github.io/react-icons/)
* [react-router-dom](https://reactrouter.com/web/guides/quick-start)
* [tailwindcss](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [ESLint](https://eslint.org/)

### Back-end
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [firebase-admin](https://www.npmjs.com/package/firebase-admin)
* [multer](https://www.npmjs.com/package/multer)
* [eslint](https://www.npmjs.com/package/eslint)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [ts-node](https://www.npmjs.com/package/ts-node)
* [typescript](https://www.npmjs.com/package/typescript)

# Como Iniciar?

**Requisitos**

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/package/npm)

## Configuração do Firebase

Este projeto utiliza o Firebase para autenticação de usuários, armazenamento de dados e manipulação de arquivos. Siga as etapas abaixo para configurar o Firebase em seu próprio projeto.

### 1. Criar um Projeto no Firebase

1. Acesse [Console do Firebase](https://console.firebase.google.com/).
2. Clique em "Adicionar projeto" e siga as instruções para configurar seu novo projeto.

### 2. Configurar a Autenticação

### Habilitar a Autenticação por E-mail/Senha

1. No Console do Firebase, vá para a seção "Authentication".
2. Escolha o método de autenticação por e-mail/senha e habilite-o.

### 3. Configurar o Firestore Database

1. No Console do Firebase, vá para a seção "Firestore Database".
2. Clique em "Criar banco de dados" e siga as instruções.
3. Escolha o modo de inicialização, por exemplo, "Modo de teste" para começar.

### 4. Configurar o Firebase Storage

1. No Console do Firebase, vá para a seção "Storage".
2. Clique em "Começar" e siga as instruções para configurar o armazenamento de arquivos.

### 5. Configurar as Credenciais no Projeto

1. No Console do Firebase, vá para as configurações do projeto.
2. Em "Configurações do projeto", vá para a guia "Geral".
3. Role para baixo até "Suas aplicações" e clique em "Adicionar aplicativo".
4. Siga as instruções para registrar seu aplicativo e obter as credenciais.

### 6. Adicionar Credenciais ao Projeto

1. Crie um arquivo `.env` na raiz do seu projeto.
2. Adicione suas credenciais Firebase ao arquivo `.env`:

   ```env
   VITE_FIREBASE_API_KEY=YOUR_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_APP_ID

**Clone o projeto e acesse a pasta**

```bash
git clone https://github.com/DiogoAMV/andrezaProject.git && cd andrezaProject
```

**Siga os passos abaixo**

### API

```bash
# Na pasta raiz do projeto, acesse a pasta 'api'
$ cd api
# Instale as dependências
$ npm install
# Com um contêiner MongoDB em execução, execute a api
$ npm run dev
```

### WEB

**Certifique-se de ter a api rodando**

```bash
# Na pasta raiz do projeto, acesse a pasta 'web'
$ cd web
# Instale as dependências
$ npm install
# Inicie a aplicação
$ npm run dev
```

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com :purple_heart: by [Diogo Marques](https://github.com/DiogoAMV)

[![Linkedin Badge](https://img.shields.io/badge/-Diogo%20Marques-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/diogomarques/)](https://www.linkedin.com/in/diogo-marques-719950221/) 
[![Gmail Badge](https://img.shields.io/badge/-contato.diogoamv@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:contato.diogoamv@gmail.com)](mailto:contato.diogoamv@gmail.com)
