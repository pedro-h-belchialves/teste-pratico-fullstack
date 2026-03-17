import Fastify from 'fastify'

import { setupRoutes } from './routes'
import { fastifyJwtPlugin } from '@infra/http/middlewares/auth-middleware'
import { fastifyCorsPlugin } from '@infra/http/pluggins/cors-plugin'

export function buildApp() {
  const app = Fastify({
    logger: false,
  })

  // configuri os plugins que usei na applpicacão, neste caso o jwt

  app.register(fastifyCorsPlugin)
  app.register(fastifyJwtPlugin)

  // aqui eu chamei as rotas montdas no index, que contém s demais
  setupRoutes(app)

  return app
}
