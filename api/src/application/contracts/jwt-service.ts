export type JwtPayloadProps = {
  account_id: string
  account_type: string
  exp?: number
}

export interface IJwtService {
  sign(payload: JwtPayloadProps): string
  verify(token: string): JwtPayloadProps
}
