import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { AuthenticateUseCase } from '@application/use-cases/auth/authenticate-use-case'
import { AccountNotFoundError } from '@application/use-cases/auth/errors/account-not-found'
import { InvalidPasswordError } from '@application/use-cases/auth/errors/invalid-password'
import {
  authenticateBodySchema,
  authenticateResponseSchema,
} from '@infra/schema/auth/authenticate-schema'

export class AuthenticateController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = authenticateBodySchema.parse(request.body)

      const result = await this.authenticateUseCase.execute(body)

      const output = authenticateResponseSchema.parse(result)

      return reply.status(200).send(output)
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        return reply.status(404).send({
          message: 'Account not found',
        })
      }

      if (error instanceof InvalidPasswordError) {
        return reply.status(401).send({
          message: 'Invalid password',
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
