import 'fastify'
import '@fastify/jwt'

declare module 'fastify' {
  export interface FastifyRequest {
    jwt?: {
      sign: (payload: any) => string
      verify: (token: string) => any
    }
    account_id?: string
    account_type?: string
  }
}
