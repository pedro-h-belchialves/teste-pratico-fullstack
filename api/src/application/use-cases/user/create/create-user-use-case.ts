import { IUserRepository } from '@domain/repositories/user-repository-contract'
import { CreateUserInput } from './create-user-input'
import { CreateUserOutput } from './create-user-output'
import { Email } from '@domain/value-objects/email'
import { User } from '@domain/entities/account/user'
import { IHashService } from '@application/contracts/hash-service'
import { UserExistsError } from './errors/user-exists-error'

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
  ) {}

  async execute(props: CreateUserInput): Promise<CreateUserOutput> {
    const userExists = await this.userRepository.findByEmail(
      props.email.toLowerCase(),
    )

    if (userExists) {
      throw new UserExistsError()
    }

    const userEmail = new Email(props.email.toLowerCase())

    const passwordHash = await this.hashService.hash(props.password)

    const user = User.create({
      name: props.name,
      email: userEmail,
      password: passwordHash,
    })

    await this.userRepository.save(user)

    return {
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
    }
  }
}
