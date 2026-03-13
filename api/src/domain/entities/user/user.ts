import { Account, IAccountProps } from './account'

export type IUser = IAccountProps & {
  name: string
}

export class User extends Account<IUser> {
  get name(): string {
    return this.props.name
  }

  protected constructor(props: Omit<IUser, 'id'> & { id?: string }) {
    super(props)
  }

  static create(props: Omit<IUser, 'id'> & { id?: string }) {
    if (!props.name) {
      throw new Error('Name is required')
    }

    return new User(props)
  }

  updateName(name: string): void {
    this.props.name = name
  }
}
