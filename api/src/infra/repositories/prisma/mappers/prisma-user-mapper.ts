import { User } from '@domain/entities/account/user'
import { Email } from '@domain/value-objects/email'
import { User as PrismaUser } from '../../../../generated/prisma/client'

export class PrismaUserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return User.create({
      id: prismaUser.id,
      email: new Email(prismaUser.email),
      password: prismaUser.password,
      name: prismaUser.name,
    })
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      email: user.email.getValue(),
      password: user.password,
      name: user.name,
      created_at: new Date(),
      updated_at: new Date(),
    }
  }
}
