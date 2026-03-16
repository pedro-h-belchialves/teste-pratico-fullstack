import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { CreateChatUseCase } from '@application/use-cases/chat/create/create-chat-use-case'
import { UserNotFoundError } from '@application/use-cases/chat/create/errors/user-not-found'
import {
  createChatBodySchema,
  createChatResponseSchema,
} from '@infra/schema/chat/create-chat-schema'

export class CreateChatController {
  constructor(private readonly createChatUseCase: CreateChatUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = createChatBodySchema.parse(request.body)

      const result = await this.createChatUseCase.execute(body)

      const output = createChatResponseSchema.parse(result)

      return reply.status(201).send(output)
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
