export type ISystemPrompt = {
  id: string
  content: string
}

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
