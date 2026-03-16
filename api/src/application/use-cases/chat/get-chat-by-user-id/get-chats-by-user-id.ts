import { FindUserByIdUseCase } from '@application/use-cases/user/find-by-id/find-user-by-id-use-case'
import { IChatRepository } from '@domain/repositories/chat-repository-contract'
import { GetChatsByUserIdOutput } from './get-chats-by-user-id-output'
import { UserNotFoundError } from './erros/user-not-found'

export class GetChatsByUserIdUseCase {
  constructor(
    private readonly chatRepository: IChatRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(user_id: string): Promise<GetChatsByUserIdOutput> {
    const user = await this.findUserByIdUseCase.execute(user_id)

    if (!user) {
      throw new UserNotFoundError()
    }

    const chats = await this.chatRepository.findByUserId(user_id)

    return {
      chats: chats.map((chat) => ({
        id: chat.id,
        title: chat.title,
      })),
    }
  }
}
