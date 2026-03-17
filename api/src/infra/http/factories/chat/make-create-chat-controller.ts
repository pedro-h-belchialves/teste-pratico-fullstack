import { CreateChatUseCase } from '@application/use-cases/chat/create/create-chat-use-case'
import { FindUserByIdUseCase } from '@application/use-cases/user/find-by-id/find-user-by-id-use-case'
import { CreateChatController } from '@infra/controller/chat/create-chat-controller'
import { PrismaChatRepository } from '@infra/repositories/prisma/prisma-chat-repository'
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository'

export const makeCreateChatController = () => {
  const userRepository = new PrismaUserRepository()
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepository)
  const chatRepository = new PrismaChatRepository()
  const createChatUseCase = new CreateChatUseCase(
    chatRepository,
    findUserByIdUseCase,
  )
  return new CreateChatController(createChatUseCase)
}
