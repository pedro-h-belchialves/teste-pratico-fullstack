import { describe, expect, it } from 'vitest'

import { User } from '../../../src/domain/entities/account/user'
import { Email } from '../../../src/domain/value-objects/email'

describe('User', () => {
  describe('create', () => {
    it('should be able to create an user extending account', () => {
      const email = new Email('email@example.com')

      const user = User.create({
        name: 'John Doe',
        email: email,
        password: '123456',
      })

      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe('John Doe')
      expect(user.email).toBeInstanceOf(Email)
      expect(user.email.getValue()).toBe('email@example.com')
      expect(user.password).toBe('123456')
    })

    it('should be able to create an user with id', () => {
      const email = new Email('email@example.com')

      const user = User.create({
        id: '1',
        name: 'John Doe',
        email: email,
        password: '123456',
      })

      expect(user).toBeTruthy()
      expect(user.id).toBe('1')
    })
  })

  describe('update', () => {
    it('should be able to update an user name', () => {
      const email = new Email('email@example.com')

      const user = User.create({
        name: 'John Doe',
        email: email,
        password: '123456',
      })

      user.updateName('New Name')

      expect(user.name).toBe('New Name')
    })

    it('should be able to update an user email', () => {
      const email = new Email('email@example.com')

      const user = User.create({
        name: 'John Doe',
        email: email,
        password: '123456',
      })

      user.updateEmail(new Email('new-email@example.com'))

      expect(user.email.getValue()).toBe('new-email@example.com')
    })

    it('should be able to update an user password', () => {
      const email = new Email('email@example.com')

      const user = User.create({
        name: 'John Doe',
        email: email,
        password: '123456',
      })

      user.updatePassword('new-password')

      expect(user.password).toBe('new-password')
    })
  })
})
