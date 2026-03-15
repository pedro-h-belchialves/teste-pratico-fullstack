import { IUserRepository } from '../../../src/domain/repositories/user-repository-contract'
import { User } from '../../../src/domain/entities/account/user'

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = []

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email.getValue() === email) || null
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async update(entity: User): Promise<void> {
    const index = this.users.findIndex((user) => user.id === entity.id)
    this.users[index] = entity
  }
}
