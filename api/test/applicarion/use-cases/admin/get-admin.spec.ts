import { describe, expect, it, beforeEach } from 'vitest'

import { GetAdminByIdUseCase } from '../../../../src/application/use-cases/admin/get-admin-by-id/get-admin-by-id-use-case'
import { InMemoryAdminRepository } from '../../../mock/repositories/in-memory-admin-repository'
import { AdminNotFoundError } from '../../../../src/application/use-cases/admin/get-admin-by-id/errors/admin-not-found'
import { makeAdmin } from '../../../mock/factory/make-admin'

describe('GetAdminByIdUseCase', () => {
  let adminRepository: InMemoryAdminRepository
  let sut: GetAdminByIdUseCase

  beforeEach(() => {
    adminRepository = new InMemoryAdminRepository()
    sut = new GetAdminByIdUseCase(adminRepository)
  })

  it('should not be able to get an admin if admin not exists', async () => {
    await expect(sut.execute('1')).rejects.toBeInstanceOf(AdminNotFoundError)
  })

  it('should be able to get an admin', async () => {
    await adminRepository.save(makeAdmin({}))

    const admin = await sut.execute('1')

    expect(admin.id).toEqual('1')
  })
})
