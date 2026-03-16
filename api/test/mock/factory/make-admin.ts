import { Admin } from '../../../src/domain/entities/account/admin'
import { Email } from '../../../src/domain/value-objects/email'

export const makeAdmin = (override: Partial<Admin>) => {
  const email = new Email(override.email || 'email@example.com')
  return Admin.create({
    id: '1',
    password: '123456',
    ...override,
    email: email,
  })
}
