import { Message } from '@domain/entities/chat/message'
import { MessageRole } from '@domain/entities/chat/message-role'
import { IChatRepository } from '@domain/repositories/chat-repository-contract'
import { SendMessageInput } from './send-message-input'
import { IIaAgentService } from '@application/contracts/agent-service'
import { SendMessageOutput } from './send-message-output'

export class SendMessageUseCase {
  constructor(
    private chatRepository: IChatRepository,
    private iaService: IIaAgentService,
  ) {}

  async execute(input: SendMessageInput): Promise<SendMessageOutput> {
    const chat = await this.chatRepository.findById(input.chatId)

    if (!chat) {
      throw new Error('Chat not found')
    }

    const userMessage = Message.create({
      role: MessageRole.USER,
      content: input.message,
      chat_id: input.chatId,
    })

    chat.addMessage(userMessage)

    if (!chat.title) {
      const chatTitle = await this.iaService.generateResponse(
        [],
        `Seu objetivo é gerar um título para o chat de ${input.message}, que seja breve e direto. `,
      )

      chat.updateTitle(chatTitle)

      await this.chatRepository.update(chat)
    }

    // Aqui eu implementei o contrato, pois caso precise alterar a implementação do IA, eu implemento no servico
    const aiResponse = await this.iaService.generateResponse(
      chat.messages,

      // aqui eu passo o system prompt dinamicamente, em um projeto real eu pegaria o isso daa entidade system prompt
      // além de melhorar significativamente a experiencia do usuario, eu poderiaa deixá-lo mais dimanico com o. metadado do usuário
      // e uma tool de capitar personalizada do usuário e salváalas, deixando uma experiencia mais personalizada
      `
      Voce é um agente de atendimennto e tem a missão de responder as dúvidas do cliente.
      `,
    )

    const assistantMessage = Message.create({
      role: MessageRole.ASSISTANT,
      content: aiResponse,
      chat_id: input.chatId,
    })

    chat.addMessage(assistantMessage)

    await this.chatRepository.update(chat)

    return {
      messages: chat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    }
  }
}
