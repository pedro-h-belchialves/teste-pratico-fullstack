import { prisma } from '@infra/database/prisma/prisma-client'

import { IUserRepository } from '@domain/repositories/user-repository-contract'
import { User } from '@domain/entities/account/user'

import { PrismaUserMapper } from './mappers/prisma-user-mapper'

export class PrismaUserRepository implements IUserRepository {
  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user)

    await prisma.user.create({
      data,
    })
  }

  async update(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user)

    await prisma.user.update({
      where: { id: user.id },
      data,
    })
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }
}
