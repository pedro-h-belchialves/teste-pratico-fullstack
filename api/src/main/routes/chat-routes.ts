import { FastifyInstance } from 'fastify'

import { makeCreateChatController } from '@infra/http/factories/chat/make-create-chat-controller'
import { makeGetChatByIdController } from '@infra/http/factories/chat/make-get-chat-by-id-controller'
import { makeGetChatsByUserIdController } from '../../infra/http/factories/chat/make-get-chats-by-user-id-controller'
import { makeSendMessageController } from '@infra/http/factories/chat/make-send-message-controller'

import { jwtValidator } from '@infra/http/middlewares/auth-middleware'
import { fastifyRouteAdapter } from '../../infra/http/adapters/fastify-route-adapter'

export async function chatRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [jwtValidator] },
    fastifyRouteAdapter(makeCreateChatController()),
  )

  app.get(
    '/:id',
    { preHandler: [jwtValidator] },
    fastifyRouteAdapter(makeGetChatByIdController()),
  )

  app.get(
    '/user/:user_id',
    { preHandler: [jwtValidator] },
    fastifyRouteAdapter(makeGetChatsByUserIdController()),
  )

  app.post(
    '/:id/message',
    { preHandler: [jwtValidator] },
    fastifyRouteAdapter(makeSendMessageController()),
  )
}
