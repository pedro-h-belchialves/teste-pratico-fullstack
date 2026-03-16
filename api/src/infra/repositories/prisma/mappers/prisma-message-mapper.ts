import { Message } from '@domain/entities/chat/message'
import { MessageRole } from '@domain/entities/chat/message-role'
import { Message as PrismaMessage } from '../../../../generated/prisma/client'

export class PrismaMessageMapper {
  static toDomain(prismaMessage: PrismaMessage): Message {
    return Message.create({
      id: prismaMessage.id,
      role: prismaMessage.role as MessageRole,
      content: prismaMessage.content,
      chat_id: prismaMessage.chat_id,
    })
  }
}
