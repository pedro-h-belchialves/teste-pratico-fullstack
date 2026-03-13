import { Account, IAccountProps } from './account'

export type IAdmin = IAccountProps

export class Admin extends Account<IAdmin> {
  protected constructor(props: Omit<IAdmin, 'id'> & { id?: string }) {
    super(props)
  }

  static create(props: Omit<IAdmin, 'id'> & { id?: string }) {
    return new Admin(props)
  }
}
