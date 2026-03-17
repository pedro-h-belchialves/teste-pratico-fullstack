import { AuthenticateUseCase } from '@application/use-cases/auth/authenticate-use-case'
import { AccountNotFoundError } from '@application/use-cases/auth/errors/account-not-found'
import { InvalidPasswordError } from '@application/use-cases/auth/errors/invalid-password'
import {
  authenticateBodySchema,
  authenticateResponseSchema,
} from '@infra/schema/auth/authenticate-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class AuthenticateController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  async handle(httpRequest: IHttpRequest) {
    console.log(httpRequest.body)
    try {
      const validation = authenticateBodySchema.safeParse(httpRequest.body)

      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            message: 'Validation error',
            issues: validation.error.flatten(),
          },
        }
      }

      const result = await this.authenticateUseCase.execute(validation.data)

      const output = authenticateResponseSchema.parse(result)

      console.log(output)
      return {
        statusCode: 200,
        body: output,
      }
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        console.error(error)
        return {
          statusCode: 404,
          body: {
            message: 'Account not found',
          },
        }
      }

      if (error instanceof InvalidPasswordError) {
        return {
          statusCode: 401,
          body: {
            message: 'Invalid password',
          },
        }
      }

      console.error(error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
