import { IHashService } from '@application/contracts/hash-service'
import { IJwtService } from '@application/contracts/jwt-service'
import { IAdminRepository } from '@domain/repositories/admin-repository-contract'
import { IUserRepository } from '@domain/repositories/user-repository-contract'
import { AuthenticateInput } from './authenticate-input'
import { AuthenticateOutput } from './authenticate-output'
import { User } from '@domain/entities/account/user'
import { Admin } from '@domain/entities/account/admin'
import { AccountNotFoundError } from './errors/account-not-found'
import { InvalidPasswordError } from './errors/invalid-password'

export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly adminRepository: IAdminRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(props: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.userRepository.findByEmail(props.email)
    const admin = await this.adminRepository.findByEmail(props.email)

    if (!user && !admin) {
      throw new AccountNotFoundError()
    }

    let account: User | Admin | null = null

    if (user) {
      account = user
    } else if (admin) {
      account = admin
    }

    if (!account) {
      throw new AccountNotFoundError()
    }

    const isPasswordValid = await this.hashService.compare(
      props.password,
      account.password,
    )

    if (!isPasswordValid) {
      throw new InvalidPasswordError()
    }

    const token = this.jwtService.sign({
      account_id: account.id,
      account_type: account instanceof Admin ? 'admin' : 'user',
    })

    return {
      access_token: token,
      account_id: account.id,
      account_type: account instanceof Admin ? 'admin' : 'user',
    }
  }
}
