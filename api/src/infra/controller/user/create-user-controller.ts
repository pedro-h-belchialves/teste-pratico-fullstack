import { CreateUserUseCase } from '@application/use-cases/user/create/create-user-use-case'
import { UserExistsError } from '@application/use-cases/user/create/errors/user-exists-error'
import {
  createUserBodySchema,
  createUserResponseSchema,
} from '@infra/schema/user/create-user-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(httpRequest: IHttpRequest) {
    try {
      const validation = createUserBodySchema.safeParse(httpRequest.body)

      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            message: 'Validation error',
            issues: validation.error.flatten(),
          },
        }
      }

      const result = await this.createUserUseCase.execute(validation.data)

      const output = createUserResponseSchema.parse(result)

      return {
        statusCode: 201,
        body: output,
      }
    } catch (error) {
      if (error instanceof UserExistsError) {
        return {
          statusCode: 409,
          body: {
            message: 'User already exists',
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
