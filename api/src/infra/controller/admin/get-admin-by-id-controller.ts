import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { GetAdminByIdUseCase } from '@application/use-cases/admin/get-admin-by-id/get-admin-by-id-use-case'

import { AdminNotFoundError } from '@application/use-cases/admin/get-admin-by-id/errors/admin-not-found'
import {
  getAdminByIdParamsSchema,
  getAdminByIdResponseSchema,
} from '@infra/schema/admin/get-admin-by-id-schema'

export class GetAdminByIdController {
  constructor(private readonly getAdminByIdUseCase: GetAdminByIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const params = getAdminByIdParamsSchema.parse(request.params)

      const result = await this.getAdminByIdUseCase.execute(params.id)

      const output = getAdminByIdResponseSchema.parse(result)

      return reply.status(200).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          message: 'Validation error',
          issues: error.flatten(),
        })
      }

      if (error instanceof AdminNotFoundError) {
        return reply.status(404).send({
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
