import { describe, expect, it, beforeEach } from 'vitest'
import { UpdateUserUseCase } from '../../../../src/application/use-cases/user/update/update-user-use-case'
import { InMemoryUserRepository } from '../../../mock/repositories/in-memory-user-repository'
import { makeUser } from '../../../mock/factory/make-user'
import { UserNotExistsError } from '../../../../src/application/use-cases/user/update/errors/user-not-exists'

describe('update-user-use-case', () => {
  let userRepository: InMemoryUserRepository
  let sut: UpdateUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new UpdateUserUseCase(userRepository)
  })

  beforeEach(async () => {
    await userRepository.save(
      makeUser({
        id: '1',
        email: 'user@email.com',
        password: '123456',
        name: 'John Doe',
      }),
    )
  })

  it('should not be able to update an user if user not exists', async () => {
    await expect(
      sut.execute({
        id: '2',
        name: 'new name',
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })

  it('should be able to update an user name', async () => {
    await sut.execute({
      id: '1',
      name: 'new name',
    })

    const user = await userRepository.findById('1')

    expect(user?.name).toEqual('new name')
  })

  it('should be able to update an user email', async () => {
    await sut.execute({
      id: '1',
      email: 'new@email.com',
    })

    const user = await userRepository.findById('1')

    expect(user?.email.getValue()).toEqual('new@email.com')
  })
})
