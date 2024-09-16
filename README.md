# Plataforma-barbeiro-backend

## comando para inicializar um ambiente no node.js e cria o arquivo package-lock.json
- comando executado na raiz do projeto:`npm init -y`

## Instalar as dependencias inicias: "Express","nodemon","sequelize","pg pg-h"
- Express : framework utilizado para criar um servidor de maneira mais eficiente
- Nodemon : ferramenta que permite a reinicialização do servidor sem a necessidade de atualizar várias vezes
- Sequelize : ORM (Object Relational Mapping) que facilita a interação com o banco de dados (PostgreSql)
- pg : driver do postgresql
- comando executado na raiz do projeto: `npm install express nodemon sequelize pg pg-h`

## Configuração Nodemon: arquivo de execução no arquivo package.json
- Na aba "script" cria o parametro: "start":"nodemon nome_do_arquivo"