import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import {
  findUserByIdParamsSchema,
  findUserByIdResponseSchema,
} from '@infra/schema/user/find-user-by-id-schema'
import { FindUserByIdUseCase } from '@application/use-cases/user/find-by-id/find-user-by-id-use-case'
import { UserNotExistsError } from '@application/use-cases/user/delete/erros/user-not-exists'

export class FindUserByIdController {
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = findUserByIdParamsSchema.parse(request.params)

      const result = await this.findUserByIdUseCase.execute(id)

      const output = findUserByIdResponseSchema.parse(result)

      return reply.status(200).send(output)
    } catch (error) {
      if (error instanceof UserNotExistsError) {
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
