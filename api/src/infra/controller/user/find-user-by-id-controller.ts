import {
  findUserByIdParamsSchema,
  findUserByIdResponseSchema,
} from '@infra/schema/user/find-user-by-id-schema'
import { FindUserByIdUseCase } from '@application/use-cases/user/find-by-id/find-user-by-id-use-case'
import { UserNotExistsError } from '@application/use-cases/user/delete/erros/user-not-exists'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class FindUserByIdController {
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}

  async handle(httpRequest: IHttpRequest) {
    try {
      const validation = findUserByIdParamsSchema.safeParse(httpRequest.params)

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

      const result = await this.findUserByIdUseCase.execute(id)

      const output = findUserByIdResponseSchema.parse(result)

      return {
        statusCode: 200,
        body: output,
      }
    } catch (error) {
      if (error instanceof UserNotExistsError) {
        return {
          statusCode: 404,
          body: {
            message: 'User not found',
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
