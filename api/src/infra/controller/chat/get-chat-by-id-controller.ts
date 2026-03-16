import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { ChatNotFoundError } from '@application/use-cases/chat/get-chat-by-id/errors/chat-not-found'
import { GetChatByIdUseCase } from '@application/use-cases/chat/get-chat-by-id/get-chat-by-id-use-case'
import {
  getChatByIdParamsSchema,
  getChatByIdResponseSchema,
} from '@infra/schema/chat/get-chat-by-id-schema'

export class GetChatByIdController {
  constructor(private readonly getChatByIdUseCase: GetChatByIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = getChatByIdParamsSchema.parse(request.params)

      const result = await this.getChatByIdUseCase.execute(id)

      const output = getChatByIdResponseSchema.parse(result)

      return reply.status(200).send(output)
    } catch (error) {
      if (error instanceof ChatNotFoundError) {
        return reply.status(404).send({
          message: 'Chat not found',
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
