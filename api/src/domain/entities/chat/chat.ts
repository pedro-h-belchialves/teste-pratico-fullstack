import { IMessage } from './message'

export interface IChat {
  id: string
  title: string
  user_id: string
  messages: IMessage[]
}

export class Chat {
  private props: IChat

  get id(): string {
    return this.props.id
  }

  get title(): string {
    return this.props.title
  }

  get user_id(): string {
    return this.props.user_id
  }

  get messages(): IMessage[] {
    return this.props.messages
  }

  private constructor(props: IChat) {
    this.props = props
  }

  static create(props: Omit<IChat, 'id'> & { id?: string }) {
    return new Chat({
      ...props,
      id: props.id ?? crypto.randomUUID(),
    })
  }

  updateTitle(title: string): void {
    this.props.title = title
  }

  addMessage(message: IMessage): void {
    if (
      message.role === 'system' &&
      this.messages.some((m) => m.role === 'system')
    ) {
      throw new Error('System message already exists')
    }

    this.props.messages.push(message)
  }

  removeMessage(message: IMessage): void {
    this.props.messages = this.props.messages.filter((m) => m.id !== message.id)
  }
}
