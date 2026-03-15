import { IUserRepository } from '@domain/repositories/user-repository-contract'
import { FindUserByIdOutput } from './find-user-by-id-outut'
import { UserNotExistsError } from './error/user-not-exists-error'

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<FindUserByIdOutput> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotExistsError()
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
    }
  }
}
