import { describe, it, expect } from 'vitest'

import { Email } from '../../../src/domain/value-objects/email'

describe('Email', () => {
  it('should not create an invalid email', () => {
    let error: Error | null = null
    try {
      new Email('invalid-email')
    } catch (e) {
      error = e as Error
    }
    expect(error).toBeInstanceOf(Error)
  })

  it('should create a valid email', () => {
    const email = new Email('a@b.com')

    expect(email.getValue()).toBe('a@b.com')
  })

  it('should convert to lowercase', () => {
    const email = new Email('A@B.COM')

    expect(email.getValue()).toBe('a@b.com')
  })

  it('should compare emails with the same value', () => {
    const email1 = new Email('a@b.com')
    const email2 = new Email('a@b.com')

    expect(email1.equals(email2)).toBe(true)
  })

  it('should compare emails with different values', () => {
    const email1 = new Email('a@b.com')
    const email2 = new Email('c@d.com')

    expect(email1.equals(email2)).toBe(false)
  })

  it('should compare emails with string values', () => {
    const email = new Email('a@b.com')

    expect(email.compare('A@b.com')).toBe(true)
  })
})
