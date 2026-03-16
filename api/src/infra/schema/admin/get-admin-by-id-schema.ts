import { z } from 'zod'

export const getAdminByIdParamsSchema = z.object({
  id: z.uuid(),
})

export const getAdminByIdResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
})

export type GetAdminByIdParams = z.infer<typeof getAdminByIdParamsSchema>
export type GetAdminByIdResponse = z.infer<typeof getAdminByIdResponseSchema>
