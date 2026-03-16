import { IChatRepository } from '@domain/repositories/chat-repository-contract'
import { GetChatByIdOutput } from './get-chat-by-id-output'
import { ChatNotFoundError } from './errors/chat-not-found'

export class GetChatByIdUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute(id: string): Promise<GetChatByIdOutput> {
    const chat = await this.chatRepository.findById(id)

    if (!chat) {
      throw new ChatNotFoundError()
    }

    return {
      id: chat.id,
      title: chat.title,
      messages: chat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    }
  }
}
