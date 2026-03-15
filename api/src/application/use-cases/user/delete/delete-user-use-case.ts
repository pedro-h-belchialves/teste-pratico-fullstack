import { IUserRepository } from '@domain/repositories/user-repository-contract'
import { UserNotExistsError } from './erros/user-not-exists'

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotExistsError()
    }

    await this.userRepository.delete(id)
  }
}
