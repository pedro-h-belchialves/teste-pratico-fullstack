import jwt from 'jsonwebtoken'
import {
  IJwtService,
  JwtPayloadProps,
} from '@application/contracts/jwt-service'

export class JwtService implements IJwtService {
  sign(payload: JwtPayloadProps): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d',
    })

    return token
  }

  verify(token: string): JwtPayloadProps {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret',
    ) as JwtPayloadProps
    return payload
  }
}
