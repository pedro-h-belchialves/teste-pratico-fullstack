import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { CreateUserUseCase } from '@application/use-cases/user/create/create-user-use-case'
import { UserExistsError } from '@application/use-cases/user/create/errors/user-exists-error'
import {
  createUserBodySchema,
  createUserResponseSchema,
} from '@infra/schema/user/create-user-schema'

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = createUserBodySchema.parse(request.body)

      const result = await this.createUserUseCase.execute(body)

      const output = createUserResponseSchema.parse(result)

      return reply.status(201).send(output)
    } catch (error) {
      if (error instanceof UserExistsError) {
        return reply.status(409).send({
          message: 'User already exists',
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
