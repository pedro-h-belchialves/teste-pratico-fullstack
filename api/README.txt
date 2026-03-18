Essa é a API da aplicação, desenvolvida com node e TS, utilizando fastify para as rotas, o prisma como ORM e
postgreSQL como banco de dados. A estrutura foi pensada seguindo bem forte os princípios de clean architecture,
separando domínio, aplicação e infraestrutura.

Eu já tinha feito um projeto parecido antes, então em alguns pontos eu mantive o mesmo padrão que usei
anteriormente e deixei alguns README como exemplo de como poderia evoluir. Também eu criei uma entidade de system-prompt
no domínio, que seria controlada por admin, mas não dei continuidade nela pois isso é apenas um teste e nao foi pedid,
foi mais para demonstrar a ideia.

Para mostrar domínio em modelagem, criei uma entidade abstrata Account, e a partir dela vêm o User e Admin.
O Admin tem apenas algumas rotas básicas (criar e buscar) e não tem papel direto na aplicação,
ele foi mais para demonstrar herança e organização. Já a entidade User herda de Account e possui mais regras de negócio.

Na parte de chat, o Chat foi tratado como um aggregate e a Message depende dele. Por isso, Message não possui
up repositório próprio, já que ela faz parte do aggregate, o que também foi uma decisão para demonstrar
o meu entendimento de DDD na prática...

A aplicação também está preparada para build e execução com Docker, mantendo o ambiente consistente.