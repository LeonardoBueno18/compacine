# Compacine

## Como rodar o projeto

Este guia irá ajudá-lo a configurar e executar o projeto Compacine em seu ambiente local.

### Pré-requisitos

- Git
- Node.js
- npm
- Docker e Docker Compose

### Passos para execução

1. **Clone o repositório**

   Primeiro, clone o repositório do projeto para sua máquina local usando o Git:

    git clone <https://github.com/LeonardoBueno18/compacine.git>

2. **Instale as dependências**

Navegue até a pasta do projeto e instale as dependências necessárias com o npm:

    cd Compacine npm install

3. **Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env` e ajuste as variáveis de ambiente conforme necessário. Certifique-se de remover os caracteres extras do nome do arquivo:

    cp .env.example .env

4. **Rode o projeto com Docker**

Com o Docker e o Docker Compose instalados, você pode facilmente rodar o projeto:

    docker-compose up

Este comando irá construir a imagem Docker (se necessário) e iniciar todos os serviços definidos no `docker-compose.yml`, incluindo o servidor Express e o MongoDB.

## Variáveis de ambiente

Para que o projeto funcione corretamente, é necessário configurar algumas variáveis de ambiente no arquivo `.env`:

- `PORT`: Define a porta na qual o servidor Express irá rodar. Exemplo: `3000`.
- `MONGODB_URI`: A URI de conexão para o banco de dados MongoDB. Isso permite que o aplicativo se conecte ao banco de dados para armazenar e recuperar dados.

Certifique-se de preencher essas variáveis de acordo com o seu ambiente de desenvolvimento.