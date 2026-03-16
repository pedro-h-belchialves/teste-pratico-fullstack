import { describe, expect, it, beforeEach } from 'vitest'

import { CreateFirstAdminUseCase } from '../../../../src/application/use-cases/admin/create/crete-first-admin-use-case'
import { InMemoryAdminRepository } from '../../../mock/repositories/in-memory-admin-repository'
import { IHashService } from '../../../../src/application/contracts/hash-service'
import { MockedHash } from '../../../mock/services/mocked-hash'
import { makeAdmin } from '../../../mock/factory/make-admin'
import { AdminAlreadyExists } from '../../../../src/application/use-cases/admin/create/errors/admin-already-exists'

describe('CreateFirstAdminUseCase', () => {
  let adminRepository: InMemoryAdminRepository
  let hashService: IHashService
  let sut: CreateFirstAdminUseCase

  beforeEach(() => {
    hashService = new MockedHash()
    adminRepository = new InMemoryAdminRepository()
    sut = new CreateFirstAdminUseCase(adminRepository, hashService)
  })

  it('should not be able to create an admin if admin already exists', async () => {
    await adminRepository.save(makeAdmin({}))

    await expect(
      sut.execute({
        email: 'admin@email',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AdminAlreadyExists)
  })

  it('should be able to create an admin', async () => {
    const { id, email } = await sut.execute({
      email: 'admin@email.com',
      password: '123456',
    })

    const admin = await adminRepository.findById(id)

    expect(admin).toBeTruthy()
    expect(id).toEqual(admin?.id)
    expect(email).toEqual(admin?.email.getValue())
    expect(await adminRepository.count()).toBe(1)
  })
})
