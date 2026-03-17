import { GetChatByIdUseCase } from '@application/use-cases/chat/get-chat-by-id/get-chat-by-id-use-case'
import { GetChatByIdController } from '@infra/controller/chat/get-chat-by-id-controller'
import { PrismaChatRepository } from '@infra/repositories/prisma/prisma-chat-repository'

export const makeGetChatByIdController = () => {
  const chatRepository = new PrismaChatRepository()
  const getChatByIdUseCase = new GetChatByIdUseCase(chatRepository)
  return new GetChatByIdController(getChatByIdUseCase)
}
