import { Admin } from '@domain/entities/account/admin'
import { IRepository } from '@domain/shared/repository'

export interface IAdminRepository extends IRepository<Admin> {
  count(): Promise<number>
}
