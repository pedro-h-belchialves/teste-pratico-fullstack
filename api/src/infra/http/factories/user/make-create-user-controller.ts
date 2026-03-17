import { CreateUserUseCase } from '@application/use-cases/user/create/create-user-use-case'
import { CreateUserController } from '@infra/controller/user/create-user-controller'
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository'
import { BcryptHashService } from '@infra/services/bcrypt-hash-service'

export const makeCreateUserController = () => {
  const bcryptAdapter = new BcryptHashService()
  const userRepository = new PrismaUserRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository, bcryptAdapter)
  return new CreateUserController(createUserUseCase)
}
