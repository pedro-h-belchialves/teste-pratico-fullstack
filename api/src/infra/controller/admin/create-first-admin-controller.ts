import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { CreateFirstAdminUseCase } from '@application/use-cases/admin/create/crete-first-admin-use-case'
import { AdminAlreadyExists } from '@application/use-cases/admin/create/errors/admin-already-exists'
import {
  createFirstAdminBodySchema,
  createFirstAdminResponseSchema,
} from '@infra/schema/admin/create-first-admin-schema'

export class CreateFirstAdminController {
  constructor(
    private readonly createFirstAdminUseCase: CreateFirstAdminUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = createFirstAdminBodySchema.parse(request.body)

      const result = await this.createFirstAdminUseCase.execute(body)

      const output = createFirstAdminResponseSchema.parse(result)

      return reply.status(201).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          message: 'Validation error',
          issues: error.flatten(),
        })
      }

      if (error instanceof AdminAlreadyExists) {
        return reply.status(409).send({
          message: error.message,
        })
      }

      request.log.error(error)

      return reply.status(500).send({
        message: 'Internal server error',
      })
    }
  }
}
