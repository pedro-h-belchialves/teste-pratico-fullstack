import { prisma } from '@infra/database/prisma/prisma-client'

import { IAdminRepository } from '@domain/repositories/admin-repository-contract'
import { Admin } from '@domain/entities/account/admin'

import { PrismaAdminMapper } from './mappers/prisma-admin-mapper'

export class PrismaAdminRepository implements IAdminRepository {
  async save(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPersistence(admin)

    await prisma.admin.create({
      data,
    })
  }

  async update(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPersistence(admin)

    await prisma.admin.update({
      where: { id: admin.id },
      data,
    })
  }

  async findById(id: string): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({
      where: { id },
    })

    if (!admin) return null

    return PrismaAdminMapper.toDomain(admin)
  }

  async delete(id: string): Promise<void> {
    await prisma.admin.delete({
      where: { id },
    })
  }

  async count(): Promise<number> {
    return prisma.admin.count()
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin) return null

    return PrismaAdminMapper.toDomain(admin)
  }
}
