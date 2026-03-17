import { DeleteUserUseCase } from '@application/use-cases/user/delete/delete-user-use-case'
import { DeleteUserController } from '@infra/controller/user/delete-user-controller'
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository'

export const makeDeleteUserController = () => {
  const userRepository = new PrismaUserRepository()
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)
  return new DeleteUserController(deleteUserUseCase)
}
