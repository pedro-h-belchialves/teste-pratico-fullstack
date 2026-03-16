import bcrypt from 'bcrypt'
import { IHashService } from '@application/contracts/hash-service'

export class BcryptHashService implements IHashService {
  private readonly saltRounds = 10

  async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds)
    return hashedPassword
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hash)
    return isValid
  }
}
