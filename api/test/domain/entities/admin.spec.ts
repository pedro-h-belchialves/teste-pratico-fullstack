import { describe, expect, it } from 'vitest'

import { Admin } from '../../../src/domain/entities/account/admin'
import { Email } from '../../../src/domain/value-objects/email'

describe('admin', () => {
  describe('create', () => {
    it('should be able to create an admin extending account', () => {
      const email = new Email('email@example.com')

      const admin = Admin.create({
        email: email,
        password: '123456',
      })

      expect(admin).toBeTruthy()
      expect(admin.id).toBeTruthy()
      expect(admin.email).toBeInstanceOf(Email)
      expect(admin.email.getValue()).toBe('email@example.com')
      expect(admin.password).toBe('123456')
    })

    it('should be able to create an admin with id', () => {
      const email = new Email('email@example.com')

      const admin = Admin.create({
        id: '1',
        email: email,
        password: '123456',
      })

      expect(admin).toBeTruthy()
      expect(admin.id).toBe('1')
    })
  })

  describe('update', () => {
    it('should be able to update an admin email', () => {
      const email = new Email('email@example.com')

      const admin = Admin.create({
        email: email,
        password: '123456',
      })

      admin.updateEmail(new Email('new-email@example.com'))

      expect(admin.email.getValue()).toBe('new-email@example.com')
    })

    it('should be able to update an admin password', () => {
      const email = new Email('email@example.com')

      const admin = Admin.create({
        email: email,
        password: '123456',
      })

      admin.updatePassword('new-password')

      expect(admin.password).toBe('new-password')
    })
  })
})
