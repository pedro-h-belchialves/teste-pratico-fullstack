import { z } from 'zod'

export const updateUserParamsSchema = z.object({
  id: z.uuid(),
})

export const updateUserBodySchema = z
  .object({
    name: z.string().min(2).optional(),
    email: z.email().optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: 'At least one field (name or email) must be provided',
  })

export const updateUserResponseSchema = z.null()

export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>
