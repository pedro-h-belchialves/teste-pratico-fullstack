import { IIaAgentService } from '@application/contracts/agent-service'
import { FakeIaAgentService } from '@infra/services/fake-ia-agent-service'
import { OpenAiAgentService } from '@infra/services/open-ai-service'

export class makeAgentFactory {
  static create(): IIaAgentService {
    const hasApiKey = !!process.env.OPENAI_API_KEY

    if (hasApiKey) {
      return new OpenAiAgentService()
    }

    return new FakeIaAgentService()
  }
}
