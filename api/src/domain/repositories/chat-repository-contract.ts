import { Chat } from '@domain/entities/chat/chat'
import { IRepository } from '@domain/shared/repository'

export interface IChatRepository extends IRepository<Chat> {
  findByUserId(user_id: string): Promise<Chat[]>
}
