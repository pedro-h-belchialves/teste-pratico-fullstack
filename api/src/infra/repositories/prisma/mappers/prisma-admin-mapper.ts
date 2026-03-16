import { Admin } from '@domain/entities/account/admin'
import { Email } from '@domain/value-objects/email'
import { Admin as PrismaAdmin } from '../../../../generated/prisma/client'

export class PrismaAdminMapper {
  static toDomain(prismaAdmin: PrismaAdmin): Admin {
    return Admin.create({
      id: prismaAdmin.id,
      email: new Email(prismaAdmin.email),
      password: prismaAdmin.password,
    })
  }

  static toPersistence(admin: Admin) {
    return {
      id: admin.id,
      email: admin.email.getValue(),
      password: admin.password,
      created_at: new Date(),
      updated_at: new Date(),
    }
  }
}
