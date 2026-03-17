import { ChatNotFoundError } from '@application/use-cases/chat/get-chat-by-id/errors/chat-not-found'
import { GetChatByIdUseCase } from '@application/use-cases/chat/get-chat-by-id/get-chat-by-id-use-case'
import {
  getChatByIdParamsSchema,
  getChatByIdResponseSchema,
} from '@infra/schema/chat/get-chat-by-id-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class GetChatByIdController {
  constructor(private readonly getChatByIdUseCase: GetChatByIdUseCase) {}

  async handle(httpRequest: IHttpRequest) {
    try {
      const validation = getChatByIdParamsSchema.safeParse(httpRequest.params)

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

      const result = await this.getChatByIdUseCase.execute(id)

      const output = getChatByIdResponseSchema.parse(result)

      return {
        statusCode: 200,
        body: output,
      }
    } catch (error) {
      if (error instanceof ChatNotFoundError) {
        return {
          statusCode: 404,
          body: {
            message: 'Chat not found',
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
