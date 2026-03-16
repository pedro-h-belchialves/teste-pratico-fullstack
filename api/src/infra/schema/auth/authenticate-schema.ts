import { z } from 'zod'

export const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export const authenticateResponseSchema = z.object({
  access_token: z.string(),
  account_id: z.string(),
  account_type: z.enum(['user', 'admin']),
})

export type AuthenticateBody = z.infer<typeof authenticateBodySchema>
export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>
