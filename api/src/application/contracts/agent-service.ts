export interface IIaAgentService {
  generateResponse(
    messages: { role: string; content: string }[],
    systemPrompt?: string,
  ): Promise<string>
}
