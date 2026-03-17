import { CreateFirstAdminUseCase } from '@application/use-cases/admin/create/crete-first-admin-use-case'
import { AdminAlreadyExists } from '@application/use-cases/admin/create/errors/admin-already-exists'
import {
  createFirstAdminBodySchema,
  createFirstAdminResponseSchema,
} from '@infra/schema/admin/create-first-admin-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class CreateFirstAdminController {
  constructor(
    private readonly createFirstAdminUseCase: CreateFirstAdminUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest) {
    try {
      const validation = createFirstAdminBodySchema.safeParse(httpRequest.body)

      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            message: 'Validation error',
            issues: validation.error.flatten(),
          },
        }
      }

      const result = await this.createFirstAdminUseCase.execute(validation.data)

      const output = createFirstAdminResponseSchema.parse(result)

      return {
        statusCode: 201,
        body: output,
      }
    } catch (error) {
      if (error instanceof AdminAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            message: error.message,
          },
        }
      }

      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
