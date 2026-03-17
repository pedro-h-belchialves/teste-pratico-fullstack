import { UpdateUserUseCase } from '@application/use-cases/user/update/update-user-use-case'
import { UserNotExistsError } from '@application/use-cases/user/update/errors/user-not-exists'
import {
  updateUserBodySchema,
  updateUserParamsSchema,
} from '@infra/schema/user/update-user-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handle(httpRequest: IHttpRequest) {
    try {
      const paramsValidation = updateUserParamsSchema.safeParse(
        httpRequest.params,
      )

      if (!paramsValidation.success) {
        return {
          statusCode: 400,
          body: {
            message: 'Validation error',
            issues: paramsValidation.error.flatten(),
          },
        }
      }

      const bodyValidation = updateUserBodySchema.safeParse(httpRequest.body)

      if (!bodyValidation.success) {
        return {
          statusCode: 400,
          body: {
            message: 'Validation error',
            issues: bodyValidation.error.flatten(),
          },
        }
      }

      const { id } = paramsValidation.data

      await this.updateUserUseCase.execute({
        id,
        ...bodyValidation.data,
      })

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
