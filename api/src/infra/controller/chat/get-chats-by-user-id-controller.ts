import { UserNotFoundError } from '@application/use-cases/chat/create/errors/user-not-found'
import { GetChatsByUserIdUseCase } from '@application/use-cases/chat/get-chat-by-user-id/get-chats-by-user-id'
import {
  getChatsByUserIdParamsSchema,
  getChatsByUserIdResponseSchema,
} from '@infra/schema/chat/get-chats-by-user-id-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class GetChatsByUserIdController {
  constructor(
    private readonly getChatsByUserIdUseCase: GetChatsByUserIdUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest) {
    try {
      const validation = getChatsByUserIdParamsSchema.safeParse(
        httpRequest.params,
      )

      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            message: 'Validation error',
            issues: validation.error.flatten(),
          },
        }
      }

      const { user_id } = validation.data

      const result = await this.getChatsByUserIdUseCase.execute(user_id)

      const output = getChatsByUserIdResponseSchema.parse(result)

      return {
        statusCode: 200,
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
