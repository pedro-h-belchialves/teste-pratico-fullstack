import { Chat } from '@domain/entities/chat/chat'

import { PrismaMessageMapper } from './prisma-message-mapper'

export class PrismaChatMapper {
  static toDomain(prismaChat: any): Chat {
    const chat = Chat.create({
      id: prismaChat.id,
      title: prismaChat.title,
      user_id: prismaChat.user_id,
      messages: prismaChat.messages
        ? prismaChat.messages.map((m: any) => PrismaMessageMapper.toDomain(m))
        : [],
    })

    return chat
  }

  static toPersistence(chat: Chat) {
    return {
      id: chat.id,
      title: chat.title,
      user_id: chat.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }
  }
}
