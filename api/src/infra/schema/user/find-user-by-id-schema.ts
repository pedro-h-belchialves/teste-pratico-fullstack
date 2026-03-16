import { z } from 'zod'

export const findUserByIdParamsSchema = z.object({
  id: z.uuid(),
})

export const findUserByIdResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
})

export type FindUserByIdParams = z.infer<typeof findUserByIdParamsSchema>
export type FindUserByIdResponse = z.infer<typeof findUserByIdResponseSchema>
