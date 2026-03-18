import { SendMessageUseCase } from '@application/use-cases/chat/send-message/send-message-use-case'
import { SendMessageController } from '@infra/controller/chat/send-message-controller'
import { PrismaChatRepository } from '@infra/repositories/prisma/prisma-chat-repository'
import { makeAgentFactory } from '../services/make-aagent-factory'

export const makeSendMessageController = () => {
  const chatRepository = new PrismaChatRepository()
  const agentService = makeAgentFactory.create()
  const sendMessageUseCase = new SendMessageUseCase(
    chatRepository,
    agentService,
  )
  return new SendMessageController(sendMessageUseCase)
}
