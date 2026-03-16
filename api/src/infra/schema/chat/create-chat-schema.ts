import { z } from 'zod'

export const createChatBodySchema = z.object({
  user_id: z.string().uuid(),
  title: z.string().min(1).max(120).optional(),
})

export const createChatResponseSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string().nullable().optional(),
})

export type CreateChatBody = z.infer<typeof createChatBodySchema>
export type CreateChatResponse = z.infer<typeof createChatResponseSchema>
