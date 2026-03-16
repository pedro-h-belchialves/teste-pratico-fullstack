import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { UpdateUserUseCase } from '@application/use-cases/user/update/update-user-use-case'
import { UserNotExistsError } from '@application/use-cases/user/update/errors/user-not-exists'
import {
  updateUserBodySchema,
  updateUserParamsSchema,
} from '@infra/schema/user/update-user-schema'

export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = updateUserParamsSchema.parse(request.params)

      const body = updateUserBodySchema.parse(request.body)

      await this.updateUserUseCase.execute({
        id,
        ...body,
      })

      return reply.status(204).send()
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
