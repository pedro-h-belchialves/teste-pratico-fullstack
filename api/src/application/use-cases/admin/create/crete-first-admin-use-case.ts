import { IHashService } from '@application/contracts/hash-service'
import { IAdminRepository } from '@domain/repositories/admin-repository-contract'
import { CreateFirstAdminInput } from './create-first-admin-input'
import { CreateFirstAdminOutput } from './create-first-admin-output'
import { AdminAlreadyExists } from './errors/admin-already-exists'
import { Email } from '@domain/value-objects/email'
import { Admin } from '@domain/entities/account/admin'

export class CreateFirstAdminUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly hashService: IHashService,
  ) {}

  async execute(props: CreateFirstAdminInput): Promise<CreateFirstAdminOutput> {
    const { email, password } = props

    const adminExists = await this.adminRepository.count()

    if (adminExists > 0) {
      throw new AdminAlreadyExists()
    }

    const adminEmail = new Email(email.toLowerCase())

    const passwordHash = await this.hashService.hash(password)

    const admin = Admin.create({
      email: adminEmail,
      password: passwordHash,
    })

    await this.adminRepository.save(admin)

    return {
      id: admin.id,
      email: admin.email.getValue(),
    }
  }
}
