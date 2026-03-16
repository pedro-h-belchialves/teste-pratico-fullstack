import { FindUserByIdUseCase } from '@application/use-cases/user/find-by-id/find-user-by-id-use-case'
import { IChatRepository } from '@domain/repositories/chat-repository-contract'
import { CreateChatInput } from './create-chat-input'
import { Chat } from '@domain/entities/chat/chat'
import { CreateChatOutput } from './create-chat-output'
import { UserNotFoundError } from './errors/user-not-found'

export class CreateChatUseCase {
  constructor(
    private readonly chatRepository: IChatRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(props: CreateChatInput): Promise<CreateChatOutput> {
    const user = await this.findUserByIdUseCase.execute(props.user_id)

    if (!user) {
      throw new UserNotFoundError()
    }

    const chat = await Chat.create({
      user_id: user.id,
      messages: [],
      title: props.title,
    })

    await this.chatRepository.save(chat)

    return {
      id: chat.id,
      user_id: chat.user_id,
      title: chat.title,
    }
  }
}
