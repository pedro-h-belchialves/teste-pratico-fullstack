import { IJwtService } from '../../../src/application/contracts/jwt-service'

export class MockedJwt implements IJwtService {
  sign(payload: any): string {
    return 'token'
  }
  verify(token: string): any {
    return {
      account_id: '1',
      account_type: 'user',
    }
  }
}
