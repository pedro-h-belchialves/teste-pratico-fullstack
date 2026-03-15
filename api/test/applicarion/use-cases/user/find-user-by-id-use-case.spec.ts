import { describe, expect, it, beforeEach } from 'vitest'
import { FindUserByIdUseCase } from '../../../../src/application/use-cases/user/find-by-id/find-user-by-id-use-case'
import { InMemoryUserRepository } from '../../../mock/repositories/in-memory-user-repository'
import { makeUser } from '../../../mock/factory/make-user'
import { UserNotExistsError } from '../../../../src/application/use-cases/user/find-by-id/error/user-not-exists-error'

describe('FindUserByIdUseCase', () => {
  let userRepository: InMemoryUserRepository
  let sut: FindUserByIdUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new FindUserByIdUseCase(userRepository)
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

  it('should not be able to find an user if user not exists', async () => {
    await expect(sut.execute('2')).rejects.toBeInstanceOf(UserNotExistsError)
  })

  it('should be able to find an user', async () => {
    const { id, name, email } = await sut.execute('1')

    expect(id).toEqual('1')
    expect(name).toEqual('John Doe')
    expect(email).toEqual('user@email.com')
  })
})
