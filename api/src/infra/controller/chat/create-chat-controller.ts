import { CreateChatUseCase } from '@application/use-cases/chat/create/create-chat-use-case'
import { UserNotFoundError } from '@application/use-cases/chat/create/errors/user-not-found'
import {
  createChatBodySchema,
  createChatResponseSchema,
} from '@infra/schema/chat/create-chat-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class CreateChatController {
  constructor(private readonly createChatUseCase: CreateChatUseCase) {}

  async handle(httpRequest: IHttpRequest) {
    try {
      const validation = createChatBodySchema.safeParse(httpRequest.body)

      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            message: 'Validation error',
            issues: validation.error.flatten(),
          },
        }
      }

      const result = await this.createChatUseCase.execute(validation.data)

      const output = createChatResponseSchema.parse(result)

      return {
        statusCode: 201,
        body: output,
      }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
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
