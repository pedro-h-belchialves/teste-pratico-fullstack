import { MessageRole } from './message-role'

export type IMessage = {
  id: string
  role: MessageRole
  content: string
  chat_id: string
}

export class Message {
  private props: IMessage

  get id(): string {
    return this.props.id
  }

  get role(): MessageRole {
    return this.props.role
  }

  get content(): string {
    return this.props.content
  }

  get chat_id(): string {
    return this.props.chat_id
  }

  private constructor(props: IMessage) {
    this.props = props
  }

  static create(props: Omit<IMessage, 'id'> & { id?: string }) {
    return new Message({
      ...props,
      id: props.id ?? crypto.randomUUID(),
    })
  }

  updateContent(content: string): void {
    this.props.content = content
  }

  updateRole(role: MessageRole): void {
    this.props.role = role
  }
}
