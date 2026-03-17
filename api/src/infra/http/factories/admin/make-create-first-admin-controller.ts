import { CreateFirstAdminUseCase } from '@application/use-cases/admin/create/crete-first-admin-use-case'
import { CreateFirstAdminController } from '@infra/controller/admin/create-first-admin-controller'
import { PrismaAdminRepository } from '@infra/repositories/prisma/prisma-admin-repository'
import { BcryptHashService } from '@infra/services/bcrypt-hash-service'

export const makeCreateFirstAdminController = () => {
  const bcryptAdapter = new BcryptHashService()
  const adminRepository = new PrismaAdminRepository()
  const createFirstAdminUseCase = new CreateFirstAdminUseCase(
    adminRepository,
    bcryptAdapter,
  )
  return new CreateFirstAdminController(createFirstAdminUseCase)
}
