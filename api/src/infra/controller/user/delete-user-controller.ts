import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { DeleteUserUseCase } from '@application/use-cases/user/delete/delete-user-use-case'
import { UserNotExistsError } from '@application/use-cases/user/delete/erros/user-not-exists'
import { deleteUserParamsSchema } from '@infra/schema/user/delete-user-schema'

export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = deleteUserParamsSchema.parse(request.params)

      await this.deleteUserUseCase.execute(id)

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
