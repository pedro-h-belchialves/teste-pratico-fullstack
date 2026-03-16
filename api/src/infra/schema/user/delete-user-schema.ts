import { z } from 'zod'

export const deleteUserParamsSchema = z.object({
  id: z.uuid(),
})

export const deleteUserResponseSchema = z.null()

export type DeleteUserParams = z.infer<typeof deleteUserParamsSchema>
