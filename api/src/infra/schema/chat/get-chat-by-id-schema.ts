import { z } from 'zod'

export const getChatByIdParamsSchema = z.object({
  id: z.uuid(),
})

export const getChatByIdMessageSchema = z.object({
  role: z.string(),
  content: z.string(),
})

export const getChatByIdResponseSchema = z.object({
  id: z.string(),
  title: z.string().nullable().optional(),
  messages: z.array(getChatByIdMessageSchema),
})

export type GetChatByIdParams = z.infer<typeof getChatByIdParamsSchema>
export type GetChatByIdResponse = z.infer<typeof getChatByIdResponseSchema>
