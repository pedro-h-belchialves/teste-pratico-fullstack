import { Email } from '@domain/value-objects/email'

export type IAccountProps = {
  id: string
  email: Email
  password: string
}

export abstract class Account<T extends IAccountProps> {
  protected props: T

  get id(): string {
    return this.props.id
  }

  get email(): Email {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  protected constructor(props: Omit<T, 'id'> & { id?: string }) {
    if (!props.email) {
      throw new Error('Email is required')
    }

    if (!props.password) {
      throw new Error('Password is required')
    }

    this.props = {
      ...props,
      id: props.id ?? crypto.randomUUID(),
    } as T
  }

  updateEmail(email: Email): void {
    this.props.email = email
  }

  updatePassword(password: string): void {
    this.props.password = password
  }
}
