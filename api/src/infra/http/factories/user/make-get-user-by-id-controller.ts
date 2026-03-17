import { FindUserByIdUseCase } from '@application/use-cases/user/find-by-id/find-user-by-id-use-case'
import { FindUserByIdController } from '@infra/controller/user/find-user-by-id-controller'
import { PrismaUserRepository } from '@infra/repositories/prisma/prisma-user-repository'

export const makeGetUserByIdController = () => {
  const userRepository = new PrismaUserRepository()
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepository)
  return new FindUserByIdController(findUserByIdUseCase)
}
