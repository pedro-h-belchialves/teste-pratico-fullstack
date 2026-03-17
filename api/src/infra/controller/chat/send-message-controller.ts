import { SendMessageUseCase } from '@application/use-cases/chat/send-message/send-message-use-case'
import {
  sendMessageBodySchema,
  sendMessageResponseSchema,
} from '@infra/schema/chat/send-message-schema'
import { IHttpRequest } from '@infra/http/contracts/http-request-contract'

export class SendMessageController {
  constructor(private readonly sendMessageUseCase: SendMessageUseCase) {}

  async handle(httpRequest: IHttpRequest) {
    console.log(httpRequest.body)
    console.log(httpRequest.params.id)
    try {
      const validation = sendMessageBodySchema.safeParse({
        ...httpRequest.body,
        chatId: httpRequest.params.id,
      })

      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            message: 'Validation error',
            issues: validation.error.flatten(),
          },
        }
      }

      const result = await this.sendMessageUseCase.execute(validation.data)

      const output = sendMessageResponseSchema.parse(result)

      return {
        statusCode: 200,
        body: output,
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
