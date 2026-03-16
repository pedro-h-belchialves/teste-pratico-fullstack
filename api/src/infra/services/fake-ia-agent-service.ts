import { IIaAgentService } from '@application/contracts/agent-service'

export class FakeIaAgentService implements IIaAgentService {
  // Em um projeto real aqui seria implementado o serviço de LLM, podendo ser openai, claaude, ollam, enntre outros
  // mas como no teste pede para retornar mensagens fakes ele retornna com base em um arry e um index aleatorio
  async generateResponse(): Promise<string> {
    const responses = [
      'Hello! How can I help you today?',
      "That's an interesting question.",
      'Could you explain a little more?',
      "I'm here to help!",
      'Let me think about that.',
    ]

    const randomIndex = Math.floor(Math.random() * responses.length)

    return responses[randomIndex]
  }
}
