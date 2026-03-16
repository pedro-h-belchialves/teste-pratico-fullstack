export type ISystemPrompt = {
  id: string
  content: string
}

// Esta entidade não será usada no teste, mas caso o produto fosse real ele seria a configuraão do prompt
export class SystemPrompt {
  private props: ISystemPrompt
  get id(): string {
    return this.props.id
  }
  get content(): string {
    return this.props.content
  }
  private constructor(props: ISystemPrompt) {
    this.props = props
  }

  static create(props: Omit<ISystemPrompt, 'id'> & { id?: string }) {
    return new SystemPrompt({
      ...props,
      id: props.id ?? crypto.randomUUID(),
    })
  }

  updateContent(content: string): void {
    this.props.content = content
  }
}
