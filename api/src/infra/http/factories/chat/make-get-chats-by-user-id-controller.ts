import { GetChatsByUserIdUseCase } from '@application/use-cases/chat/get-chat-by-user-id/get-chats-by-user-id'
import { FindUserByIdUseCase } from '@application/use-cases/user/find-by-id/find-user-by-id-use-case'
import { GetChatsByUserIdController } from '@infra/controller/chat/get-chats-by-user-id-controller'
import { PrismaChatRepository } from '@infra/repositories/prisma/prisma-chat-repository'
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository'

export const makeGetChatsByUserIdController = () => {
  const chatRepository = new PrismaChatRepository()
  const userRepository = new PrismaUserRepository()
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepository)
  const getChatsByUserIdUseCase = new GetChatsByUserIdUseCase(
    chatRepository,
    findUserByIdUseCase,
  )
  return new GetChatsByUserIdController(getChatsByUserIdUseCase)
}
