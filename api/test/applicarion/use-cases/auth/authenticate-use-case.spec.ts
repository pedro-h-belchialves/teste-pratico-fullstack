import { describe, expect, it, beforeEach } from 'vitest'

import { AuthenticateUseCase } from '../../../../src/application/use-cases/auth/authenticate-use-case'
import { InMemoryAdminRepository } from '../../../mock/repositories/in-memory-admin-repository'
import { InMemoryUserRepository } from '../../../mock/repositories/in-memory-user-repository'
import { IHashService } from '../../../../src/application/contracts/hash-service'
import { IJwtService } from '../../../../src/application/contracts/jwt-service'
import { MockedHash } from '../../../mock/services/mocked-hash'
import { MockedJwt } from '../../../mock/services/mocked-jwt'
import { AccountNotFoundError } from '../../../../src/application/use-cases/auth/errors/account-not-found'
import { makeUser } from '../../../mock/factory/make-user'
import { InvalidPasswordError } from '../../../../src/application/use-cases/auth/errors/invalid-password'
import { makeAdmin } from '../../../mock/factory/make-admin'

describe('AuthenticateUseCase', () => {
  let adminRepository: InMemoryAdminRepository
  let userRepository: InMemoryUserRepository
  let hashService: IHashService
  let jwtService: IJwtService
  let sut: AuthenticateUseCase

  beforeEach(() => {
    adminRepository = new InMemoryAdminRepository()
    userRepository = new InMemoryUserRepository()
    hashService = new MockedHash()
    jwtService = new MockedJwt()
    sut = new AuthenticateUseCase(
      userRepository,
      adminRepository,
      hashService,
      jwtService,
    )
  })

  it('should not be able to authenticate ccount if account not exists', async () => {
    await expect(
      sut.execute({
        email: 'user@email',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AccountNotFoundError)
  })

  it('should not be able to authenticate ccount if password is invalid', async () => {
    await userRepository.save(
      makeUser({
        email: 'user@email.com',
        password: '123456',
      }),
    )
    await expect(
      sut.execute({
        email: 'user@email.com',
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(InvalidPasswordError)
  })

  it('should be able to authenticate  user account', async () => {
    await userRepository.save(
      makeUser({
        email: 'user@email.com',
        password: '123456',
      }),
    )
    const { access_token, account_id, account_type } = await sut.execute({
      email: 'user@email.com',
      password: '123456',
    })

    expect(access_token).toEqual('token')
    expect(account_id).toEqual('1')
    expect(account_type).toEqual('user')
  })

  it('should be able to authenticate  admin account', async () => {
    await adminRepository.save(
      makeAdmin({
        email: 'admin@email.com',
        password: '123456',
      }),
    )
    const { access_token, account_id, account_type } = await sut.execute({
      email: 'admin@email.com',
      password: '123456',
    })

    expect(access_token).toEqual('token')
    expect(account_id).toEqual('1')
    expect(account_type).toEqual('admin')
  })
})
