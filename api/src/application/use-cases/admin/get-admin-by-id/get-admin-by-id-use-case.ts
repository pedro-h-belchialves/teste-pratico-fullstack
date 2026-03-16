import { IAdminRepository } from '@domain/repositories/admin-repository-contract'
import { GetAdminByIdOutput } from './get-admin-by-id-output'
import { AdminNotFoundError } from './errors/admin-not-found'

export class GetAdminByIdUseCase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(id: string): Promise<GetAdminByIdOutput> {
    const admin = await this.adminRepository.findById(id)

    if (!admin) {
      throw new AdminNotFoundError()
    }

    return {
      id: admin.id,
      email: admin.email.getValue(),
    }
  }
}
