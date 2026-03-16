import { z } from 'zod'

export const getChatsByUserIdParamsSchema = z.object({
  user_id: z.uuid(),
})

export const getChatsByUserIdChatSchema = z.object({
  id: z.string(),
  title: z.string().nullable().optional(),
})

export const getChatsByUserIdResponseSchema = z.object({
  chats: z.array(getChatsByUserIdChatSchema),
})

export type GetChatsByUserIdParams = z.infer<
  typeof getChatsByUserIdParamsSchema
>
export type GetChatsByUserIdResponse = z.infer<
  typeof getChatsByUserIdResponseSchema
>
