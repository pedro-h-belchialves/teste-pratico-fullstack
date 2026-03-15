import { describe, expect, it, beforeEach } from 'vitest'
import { DeleteUserUseCase } from '../../../../src/application/use-cases/user/delete/delete-user-use-case'
import { InMemoryUserRepository } from '../../../mock/repositories/in-memory-user-repository'
import { makeUser } from '../../../mock/factory/make-user'
import { UserNotExistsError } from '../../../../src/application/use-cases/user/delete/erros/user-not-exists'

describe('DeleteUserUseCase', () => {
  let userRepository: InMemoryUserRepository
  let sut: DeleteUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(userRepository)
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

  it('should not be able to  delete user if user not exists', async () => {
    await expect(sut.execute('2')).rejects.toBeInstanceOf(UserNotExistsError)
  })

  it('should be able to delete user', async () => {
    await sut.execute('1')

    expect(await userRepository.findById('1')).toBeNull()
  })
})
