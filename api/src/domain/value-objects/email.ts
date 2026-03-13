export class Email {
  private readonly value: string

  constructor(email: string) {
    if (!Email.isValid(email)) {
      throw new Error('Invalid email')
    }

    // all emails are converted to lowercase for case-insensitive comparison
    this.value = email.toLowerCase()
  }

  public getValue(): string {
    return this.value
  }

  // this method compare email with another email VO
  public equals(email: Email): boolean {
    return this.value === email.getValue()
  }

  // this method compare email with string for easier comparison
  public compare(email: string): boolean {
    return this.value === email.toLowerCase()
  }

  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
