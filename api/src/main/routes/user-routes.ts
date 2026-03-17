import { FastifyInstance } from 'fastify'

import { makeCreateUserController } from '@infra/http/factories/user/make-create-user-controller'
import { makeuthenticateController } from '../../infra/http/factories/auth/make-authenticate-controller'
import { makeGetUserByIdController } from '@infra/http/factories/user/make-get-user-by-id-controller'
import { makeDeleteUserController } from '@infra/http/factories/user/make-delete-user-controller'
import { makeUpdateUserController } from '@infra/http/factories/user/make-update-user-controller'

import { jwtValidator } from '@infra/http/middlewares/auth-middleware'
import { fastifyRouteAdapter } from '../../infra/http/adapters/fastify-route-adapter'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', fastifyRouteAdapter(makeCreateUserController()))

  app.post('/login', fastifyRouteAdapter(makeuthenticateController()))

  app.get(
    '/:id',
    {
      preHandler: [jwtValidator],
    },
    fastifyRouteAdapter(makeGetUserByIdController()),
  )

  app.delete(
    '/:id',
    {
      preHandler: [jwtValidator],
    },
    fastifyRouteAdapter(makeDeleteUserController()),
  )

  app.patch(
    '/:id',
    {
      preHandler: [jwtValidator],
    },
    fastifyRouteAdapter(makeUpdateUserController()),
  )
}
