import { AuthenticateUseCase } from '@application/use-cases/auth/authenticate-use-case'
import { AuthenticateController } from '@infra/controller/auth/authenticate-controller'
import { PrismaAdminRepository } from '@infra/repositories/prisma/prisma-admin-repository'
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository'
import { BcryptHashService } from '@infra/services/bcrypt-hash-service'
import { JwtService } from '@infra/services/jwt-service'

export const makeuthenticateController = () => {
  const userRepository = new PrismaUserRepository()
  const jwtAdapter = new JwtService()
  const adminRepository = new PrismaAdminRepository()
  const bcryptAdapter = new BcryptHashService()

  const authenticateUseCase = new AuthenticateUseCase(
    userRepository,
    adminRepository,
    bcryptAdapter,
    jwtAdapter,
  )
  return new AuthenticateController(authenticateUseCase)
}
