import { z } from 'zod'

export const sendMessageBodySchema = z.object({
  chatId: z.uuid(),
  message: z.string().min(1).max(2000),
})

export const sendMessageMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
})

export const sendMessageResponseSchema = z.object({
  messages: z.array(sendMessageMessageSchema),
})

export type SendMessageBody = z.infer<typeof sendMessageBodySchema>
export type SendMessageResponse = z.infer<typeof sendMessageResponseSchema>
