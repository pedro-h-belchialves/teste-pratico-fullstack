import { User } from '@domain/entities/account/user'
import { IRepository } from '@domain/shared/repository'

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>
}
