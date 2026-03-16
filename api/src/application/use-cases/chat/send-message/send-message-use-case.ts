import { Message } from '@domain/entities/chat/message'
import { MessageRole } from '@domain/entities/chat/message-role'
import { IChatRepository } from '@domain/repositories/chat-repository-contract'
import { SendMessageInput } from './send-message-input'
import { IIaAgentService } from '@application/contracts/agent-service'
import { SendMessageOutput } from './send-message-output'

export class SendMessageUseCase {
  constructor(
    private chatRepository: IChatRepository,
    private iaService: IIaAgentService,
  ) {}

  async execute(input: SendMessageInput): Promise<SendMessageOutput> {
    const chat = await this.chatRepository.findById(input.chatId)

    if (!chat) {
      throw new Error('Chat not found')
    }

    const userMessage = Message.create({
      role: MessageRole.USER,
      content: input.message,
      chat_id: input.chatId,
    })

    chat.addMessage(userMessage)

    const aiResponse = await this.iaService.generateResponse()

    const assistantMessage = Message.create({
      role: MessageRole.ASSISTANT,
      content: aiResponse,
      chat_id: input.chatId,
    })

    chat.addMessage(assistantMessage)

    await this.chatRepository.save(chat)

    return {
      messages: chat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    }
  }
}
