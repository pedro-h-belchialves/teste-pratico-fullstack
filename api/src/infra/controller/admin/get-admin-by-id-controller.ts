import { GetAdminByIdUseCase } from '@application/use-cases/admin/get-admin-by-id/get-admin-by-id-use-case'
import { AdminNotFoundError } from '@application/use-cases/admin/get-admin-by-id/errors/admin-not-found'
import {
  getAdminByIdParamsSchema,
  getAdminByIdResponseSchema,
} from '@infra/schema/admin/get-admin-by-id-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class GetAdminByIdController {
  constructor(private readonly getAdminByIdUseCase: GetAdminByIdUseCase) {}

  async handle(httpRequest: IHttpRequest) {
    try {
      const validation = getAdminByIdParamsSchema.safeParse(httpRequest.params)

      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            message: 'Validation error',
            issues: validation.error.flatten(),
          },
        }
      }

      const { id } = validation.data

      const result = await this.getAdminByIdUseCase.execute(id)

      const output = getAdminByIdResponseSchema.parse(result)

      return {
        statusCode: 200,
        body: output,
      }
    } catch (error) {
      if (error instanceof AdminNotFoundError) {
        return {
          statusCode: 404,
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
