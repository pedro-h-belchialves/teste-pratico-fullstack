import { FastifyInstance } from 'fastify'

import { makeCreateFirstAdminController } from '../../infra/http/factories/admin/make-create-first-admin-controller'
import { makeGetAdminByIdController } from '@infra/http/factories/admin/make-get-admin-by-id-controller'

import { jwtValidator } from '@infra/http/middlewares/auth-middleware'
import { fastifyRouteAdapter } from '../../infra/http/adapters/fastify-route-adapter'

export async function adminRoutes(app: FastifyInstance) {
  app.post('/', fastifyRouteAdapter(makeCreateFirstAdminController()))

  app.get(
    '/:id',
    { preHandler: [jwtValidator] },
    fastifyRouteAdapter(makeGetAdminByIdController()),
  )
}
