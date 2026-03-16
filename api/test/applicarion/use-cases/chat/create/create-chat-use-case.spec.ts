import { describe, expect, it, beforeEach } from 'vitest'

import { CreateChatUseCase } from '../../../../../src/application/use-cases/chat/create/create-chat-use-case'
import { FindUserByIdUseCase } from '../../../../../src/application/use-cases/user/find-by-id/find-user-by-id-use-case'
import { InMemoryUserRepository } from '../../../../mock/repositories/in-memory-user-repository'
import { InMemoryChatRepository } from '../../../../mock/repositories/in-memory-chat-repository'
import { makeUser } from '../../../../mock/factory/make-user'
import { UserNotExistsError } from '../../../../../src/application/use-cases/user/find-by-id/error/user-not-exists-error'

describe('CreateChatUseCase', () => {
  let chatRepository: InMemoryChatRepository
  let userRepository: InMemoryUserRepository
  let findUserByIdUseCase: FindUserByIdUseCase
  let sut: CreateChatUseCase

  beforeEach(() => {
    chatRepository = new InMemoryChatRepository()
    userRepository = new InMemoryUserRepository()
    findUserByIdUseCase = new FindUserByIdUseCase(userRepository)
    sut = new CreateChatUseCase(chatRepository, findUserByIdUseCase)
  })

  it('should not be able to create a chat if user not exists', async () => {
    await expect(
      sut.execute({
        user_id: '1',
        title: 'Chat 1',
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })

  it('should be able to create a chat', async () => {
    await userRepository.save(
      makeUser({
        id: '1',
        email: 'user@email.com',
        password: '123456',
        name: 'John Doe',
      }),
    )

    const { id, title, user_id } = await sut.execute({
      user_id: '1',
      title: 'Chat 1',
    })

    expect(id).toBeDefined()
    expect(user_id).toEqual('1')
    expect(title).toEqual('Chat 1')
  })
})
