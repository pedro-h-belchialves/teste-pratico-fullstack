import { SendMessageUseCase } from '@application/use-cases/chat/send-message/send-message-use-case'
import { SendMessageController } from '@infra/controller/chat/send-message-controller'
import { PrismaChatRepository } from '@infra/repositories/prisma/prisma-chat-repository'
import { FakeIaAgentService } from '@infra/services/fake-ia-agent-service'

export const makeSendMessageController = () => {
  const chatRepository = new PrismaChatRepository()
  const agentService = new FakeIaAgentService()
  const sendMessageUseCase = new SendMessageUseCase(
    chatRepository,
    agentService,
  )
  return new SendMessageController(sendMessageUseCase)
}
