import jwt, { SignOptions } from 'jsonwebtoken'
import {
  IJwtService,
  JwtPayloadProps,
} from '@application/contracts/jwt-service'

export class JwtService implements IJwtService {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: SignOptions['expiresIn'] = '1d',
  ) {}

  sign(payload: JwtPayloadProps): string {
    const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })

    return token
  }

  verify(token: string): JwtPayloadProps {
    const decoded = jwt.verify(token, this.secret) as JwtPayloadProps

    return decoded
  }
}
