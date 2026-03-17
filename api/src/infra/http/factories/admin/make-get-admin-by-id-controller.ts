import { GetAdminByIdUseCase } from '@application/use-cases/admin/get-admin-by-id/get-admin-by-id-use-case'
import { GetAdminByIdController } from '@infra/controller/admin/get-admin-by-id-controller'
import { PrismaAdminRepository } from '@infra/repositories/prisma/prisma-admin-repository'

export const makeGetAdminByIdController = () => {
  const adminRepository = new PrismaAdminRepository()
  const findAdminByIdUseCase = new GetAdminByIdUseCase(adminRepository)
  return new GetAdminByIdController(findAdminByIdUseCase)
}
