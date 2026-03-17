import { DeleteUserUseCase } from '@application/use-cases/user/delete/delete-user-use-case'
import { UserNotExistsError } from '@application/use-cases/user/delete/erros/user-not-exists'
import { deleteUserParamsSchema } from '@infra/schema/user/delete-user-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle(httpRequest: IHttpRequest) {
    try {
      const validation = deleteUserParamsSchema.safeParse(httpRequest.params)

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

      await this.deleteUserUseCase.execute(id)

      return {
        statusCode: 204,
        body: null,
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
