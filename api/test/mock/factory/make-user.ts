import { User } from '../../../src/domain/entities/account/user'
import { Email } from '../../../src/domain/value-objects/email'

export const makeUser = (override: Partial<User>) => {
  const email = new Email(override.email || 'email@example.com')
  return User.create({
    id: '1',
    name: 'John Doe',
    password: '123456',
    ...override,
    email: email,
  })
}
