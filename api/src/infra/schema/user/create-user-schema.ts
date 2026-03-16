import { z } from 'zod'

export const createUserBodySchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
})

export const createUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
})

export type createUserBody = z.infer<typeof createUserBodySchema>
export type createUserResponse = z.infer<typeof createUserResponseSchema>
