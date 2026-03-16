export class AdminAlreadyExists extends Error {
  constructor() {
    super('Admin already exists')
    this.name = 'AdminAlreadyExists'
  }
}
