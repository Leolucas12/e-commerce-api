## E-commerce: Backend

### Objetivos:
Criar uma API em **Nodejs** que tenha o **CRUD** (Criar, visualizar, editar e deletar) de produtos utilizando o banco Postgres. Essa API de produtos terá os seguintes campos:

 - Nome
 - Preço
 - Quantidade em Estoque

### Bônus:

 - Autenticação com JWT
 - Tags para indexar melhor os produtos
 
### Iniciando o projeto:

1. Criar um banco de dados Postgres para armazenar os dados do projeto
2. Criar um arquivo `.env` na raiz do projeto e preencher com as variáveis ambiente:
```
APP_PORT=3333

APP_SECRET=''

POSTGRES_HOST=''

POSTGRES_PORT=''

POSTGRES_USER=''

POSTGRES_PASS=''

POSTGRES_NAME=''

NODE_ENV='dev'
```
3. Executar as migrations no banco de dados com o comando `yarn typeorm migration:run` 
4. Iniciar o projeto com o comando `yarn dev`
