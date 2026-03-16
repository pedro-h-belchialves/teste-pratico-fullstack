export class AdminNotFoundError extends Error {
  constructor() {
    super('Admin not found')
    this.name = 'AdminNotFoundError'
  }
}
