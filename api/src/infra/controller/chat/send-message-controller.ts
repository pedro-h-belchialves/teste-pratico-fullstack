import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { SendMessageUseCase } from '@application/use-cases/chat/send-message/send-message-use-case'
import {
  sendMessageBodySchema,
  sendMessageResponseSchema,
} from '@infra/schema/chat/send-message-schema'

export class SendMessageController {
  constructor(private readonly sendMessageUseCase: SendMessageUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = sendMessageBodySchema.parse(request.body)

      const result = await this.sendMessageUseCase.execute(body)

      const output = sendMessageResponseSchema.parse(result)

      return reply.status(200).send(output)
    } catch (error) {
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
