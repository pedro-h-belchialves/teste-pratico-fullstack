import { describe, expect, it, beforeEach } from 'vitest'
import { CreateUserUseCase } from '../../../../src/application/use-cases/user/create/create-user-use-case'
import { IHashService } from '../../../../src/application/contracts/hash-service'
import { InMemoryUserRepository } from '../../../mock/repositories/in-memory-user-repository'
import { MockedHash } from '../../../mock/services/mocked-hash'
import { makeUser } from '../../../mock/factory/make-user'
import { UserExistsError } from '../../../../src/application/use-cases/user/create/errors/user-exists-error'

describe('CreateUserUseCase', () => {
  let hashService: IHashService
  let userRepository: InMemoryUserRepository
  let sut: CreateUserUseCase

  beforeEach(() => {
    hashService = new MockedHash()
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository, hashService)
  })

  it('should not be able to create an user if user already exists', async () => {
    await userRepository.save(makeUser({ email: 'user@email.com' }))

    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'user@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserExistsError)
  })

  it('should be able to create an user', async () => {
    const { id, name, email } = await sut.execute({
      name: 'John Doe',
      email: 'user@email.com',
      password: '123456',
    })

    expect(id).toBeTruthy()
    expect(name).toBe('John Doe')
    expect(email).toBe('user@email.com')
    expect(await userRepository.findById(id)).toBeDefined()
  })
})
