import { UpdateUserUseCase } from '@application/use-cases/user/update/update-user-use-case'
import { UpdateUserController } from '@infra/controller/user/update-user-controller'
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository'

export const makeUpdateUserController = () => {
  const userRepository = new PrismaUserRepository()
  const updateUserUseCase = new UpdateUserUseCase(userRepository)
  return new UpdateUserController(updateUserUseCase)
}
