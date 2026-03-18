
Esse é um projeto fullstack do teste (chat com IA simulada), contendo o WEB e  a API separados, mas orquestrados
juntos através de um docker compose global.

Para subir toda a aplicação, basta executar: 'docker compose up --build'


Esse comando já vai buildar tudo e iniciar os containers necessários, incluindo o PostgreSQL, a API e o WEB,
deixando o ambiente pronto para uso.

A API foi desenvolvida com node.js e TypeScript, utilizando  fastify, prisma e PostgreSQL para DB, seguindo
rigidammente princípios de clean architecture, SOLID e conceitos de DDD para organização de domínio
e regras de negócio.

O frontend foi desenvolvido com react e TypeScript usando vite e tailwind, com o foco em organização,
reutilização de componentes e boa experiência do usuário.

O Docker Compose foi configurado de forma global para orquestrar todos os serviços, facilitando a execução do
projeto em qualquer ambiente sem necessidade de configuração manual de dependências.

Caso queira testar uma experiência mais próxima de uma IA real, é possível configurar uma chave da OpenAI.
Basta adicionar a variável `OPENAI_API_KEY` no arquivo `.env` da API. Também deixei arquivos `.env.example` como
referência de configuração.

