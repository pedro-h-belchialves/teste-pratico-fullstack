import OpenAI from 'openai'
import { IIaAgentService } from '@application/contracts/agent-service'

export class OpenAiAgentService implements IIaAgentService {
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async generateResponse(
    messages: { role: string; content: string }[],
    systemPrompt?: string,
  ): Promise<string> {
    if (systemPrompt) {
      messages.unshift({ role: 'system', content: systemPrompt })
    }

    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages.map((msg) => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      })),
    })

    return completion.choices[0].message.content || ''
  }
}
