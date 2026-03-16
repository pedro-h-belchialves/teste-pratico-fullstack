import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { UserNotFoundError } from '@application/use-cases/chat/create/errors/user-not-found'
import { GetChatsByUserIdUseCase } from '@application/use-cases/chat/get-chat-by-user-id/get-chats-by-user-id'
import {
  getChatsByUserIdParamsSchema,
  getChatsByUserIdResponseSchema,
} from '@infra/schema/chat/get-chats-by-user-id-schema'

export class GetChatsByUserIdController {
  constructor(
    private readonly getChatsByUserIdUseCase: GetChatsByUserIdUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { user_id } = getChatsByUserIdParamsSchema.parse(request.params)

      const result = await this.getChatsByUserIdUseCase.execute(user_id)

      const output = getChatsByUserIdResponseSchema.parse(result)

      return reply.status(200).send(output)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return reply.status(404).send({
          message: 'User not found',
        })
      }

      if (error instanceof ZodError) {
        return reply.status(400).send({
          message: 'Validation error',
          issues: error.flatten(),
        })
      }

      request.log.error(error)

      return reply.status(500).send({
        message: 'Internal server error',
      })
    }
  }
}
