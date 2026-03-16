import { IAdminRepository } from '../../../src/domain/repositories/admin-repository-contract'
import { Admin } from '../../../src/domain/entities/account/admin'

export class InMemoryAdminRepository implements IAdminRepository {
  private admins: Admin[] = []

  async save(user: Admin): Promise<void> {
    this.admins.push(user)
  }

  async delete(id: string): Promise<void> {
    this.admins = this.admins.filter((user) => user.id !== id)
  }

  async findById(id: string): Promise<Admin | null> {
    return this.admins.find((user) => user.id === id) || null
  }

  async update(entity: Admin): Promise<void> {
    const index = this.admins.findIndex((user) => user.id === entity.id)
    this.admins[index] = entity
  }

  async count(): Promise<number> {
    return this.admins.length
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.admins.find((user) => user.email.getValue() === email) || null
  }
}
