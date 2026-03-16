export interface GetChatByIdOutput {
  id: string
  title?: string
  messages: {
    role: string
    content: string
  }[]
}
