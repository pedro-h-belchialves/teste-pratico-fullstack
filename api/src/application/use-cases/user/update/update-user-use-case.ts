import { IUserRepository } from '@domain/repositories/user-repository-contract'
import { UpdateUserInput } from './update-user-input'
import { UserNotExistsError } from './errors/user-not-exists'
import { Email } from '@domain/value-objects/email'

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(props: UpdateUserInput) {
    const { id, name, email } = props

    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotExistsError()
    }

    if (name) {
      user.updateName(name)
    }

    if (email) {
      const newEmail = new Email(email)
      user.updateEmail(newEmail)
    }

    await this.userRepository.update(user)
  }
}
