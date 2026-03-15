import { IHashService } from '../../../src/application/contracts/hash-service'

export class MockedHash implements IHashService {
  async compare(password: string, hash: string): Promise<boolean> {
    return password === hash
  }

  async hash(password: string): Promise<string> {
    return password
  }
}
