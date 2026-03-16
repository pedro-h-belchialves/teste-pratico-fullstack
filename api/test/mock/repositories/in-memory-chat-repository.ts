import { IChatRepository } from '../../../src/domain/repositories/chat-repository-contract'
import { Chat } from '../../../src/domain/entities/chat/chat'

export class InMemoryChatRepository implements IChatRepository {
  private chats: Chat[] = []

  async save(chat: Chat): Promise<void> {
    this.chats.push(chat)
  }

  async findByUserId(user_id: string): Promise<Chat[]> {
    return this.chats.filter((chat) => chat.user_id === user_id)
  }

  async findById(id: string): Promise<Chat | null> {
    return this.chats.find((chat) => chat.id === id) ?? null
  }

  async delete(id: string): Promise<void> {
    this.chats = this.chats.filter((chat) => chat.id !== id)
  }

  async count(): Promise<number> {
    return this.chats.length
  }
}
