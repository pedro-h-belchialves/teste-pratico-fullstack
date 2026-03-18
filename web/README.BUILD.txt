O Build eu fiz com Docker + Nginx, para buildar apenas o front basta usar 'docker compose up -d --build'

Eu usei o nginx porque a aplicação react com vite, depois do build, vira apenas um conjunto
de arquivos estáticos, como HTML, CSS JS. Esses arquivos não precisam de um servidor node
rodando, eles só precisam ser entregues para o navegador

Então o fluxo funciona assim: primeiro eu uso o vite para fazer o build da aplicação, que gera uma
paasta dist com todos os arquivos otimizados. Depois disso, eu uso o nginx como servidor web para servir
esses arquivos

O nginx é mais leve e mais rápido do que usar node para isso, além de ser mais seguro e mais comum em
produção. Ele é otimizado justamente para servir arquivos estáticos com alta performance

Dentro do docker, eu usei um build em duas etapas: na primeira etapa eu uso node para instalar as dependências
e gerar o build, e na segunda etapa eu uso o nginx para servir os arquivos gerados. Isso deixa a imagem
final menor e mais eficiente.

Também configurei o nginx para sempre retornar o index.html quando uma rota não for encontrada

No final, isso me dá uma aplicação mais performática, mais leve e pronta para produção.