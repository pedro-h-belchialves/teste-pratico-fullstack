import { prisma } from '@infra/database/prisma/prisma-client'

import { Chat } from '@domain/entities/chat/chat'
import { IChatRepository } from '@domain/repositories/chat-repository-contract'

import { PrismaChatMapper } from './mappers/prisma-chat-mapper'

export class PrismaChatRepository implements IChatRepository {
  async save(chat: Chat): Promise<void> {
    const data = PrismaChatMapper.toPersistence(chat)

    await prisma.chat.create({
      data: {
        id: 'chat-id',
        user_id: 'user-id',
        messages: {
          create: [
            {
              id: 'message-id',
              role: 'user',
              content: 'oi',
            },
            {
              id: 'message-id-2',
              role: 'assistant',
              content: "I'm here to help!",
            },
          ],
        },
      },
    })
  }

  async update(chat: Chat): Promise<void> {
    const existingMessages = await prisma.message.findMany({
      where: { chat_id: chat.id },
    })

    const existingIds = new Set(existingMessages.map((m) => m.id))
    const newIds = new Set(chat.messages.map((m) => m.id))

    const messagesToCreate = chat.messages.filter((m) => !existingIds.has(m.id))

    const messagesToDelete = existingMessages.filter((m) => !newIds.has(m.id))

    await prisma.$transaction([
      prisma.chat.update({
        where: { id: chat.id },
        data: {
          title: chat.title,
          updated_at: new Date(),
        },
      }),

      ...messagesToCreate.map((message) =>
        prisma.message.create({
          data: {
            id: message.id,
            role: message.role,
            content: message.content,
            chat_id: chat.id,
            created_at: new Date(),
            updated_at: new Date(),
          },
        }),
      ),

      ...messagesToDelete.map((message) =>
        prisma.message.delete({
          where: { id: message.id },
        }),
      ),
    ])
  }

  async findById(id: string): Promise<Chat | null> {
    const chat = await prisma.chat.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: {
            created_at: 'asc',
          },
        },
      },
    })

    if (!chat) return null

    return PrismaChatMapper.toDomain(chat)
  }

  async delete(id: string): Promise<void> {
    await prisma.chat.delete({
      where: { id },
    })
  }

  async findByUserId(user_id: string): Promise<Chat[]> {
    const chats = await prisma.chat.findMany({
      where: { user_id },
      include: {
        messages: {
          orderBy: {
            created_at: 'asc',
          },
        },
      },
    })

    return chats.map(PrismaChatMapper.toDomain)
  }
}
