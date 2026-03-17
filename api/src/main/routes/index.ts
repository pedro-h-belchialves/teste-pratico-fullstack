import { FastifyInstance } from 'fastify'

import { userRoutes } from './user-routes'
import { adminRoutes } from './admin-routes'
import { chatRoutes } from './chat-routes'

export async function setupRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: '/users' })
  app.register(adminRoutes, { prefix: '/admins' })
  app.register(chatRoutes, { prefix: '/chats' })
}
