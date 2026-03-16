import { z } from 'zod'

export const createFirstAdminBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
})

export const createFirstAdminResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
})

export type CreateFirstAdminBody = z.infer<typeof createFirstAdminBodySchema>
export type CreateFirstAdminResponse = z.infer<
  typeof createFirstAdminResponseSchema
>
