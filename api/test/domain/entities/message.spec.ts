import { describe, expect, it } from 'vitest'

import { Message } from '../../../src/domain/entities/chat/message'
import { MessageRole } from '../../../src/domain/entities/chat/message-role'

describe('Message', () => {
  describe('create', () => {
    it('should be able to create a message without id', () => {
      const message = Message.create({
        role: MessageRole.USER,
        content: 'Hello',
        chat_id: '1',
      })

      expect(message).toBeTruthy()
      expect(message.id).toBeTruthy()
      expect(message.role).toBe('user')
      expect(message.content).toBe('Hello')
      expect(message.chat_id).toBe('1')
    })

    it('should be able to create a message with id', () => {
      const message = Message.create({
        id: '1',
        role: MessageRole.USER,
        content: 'Hello',
        chat_id: '1',
      })

      expect(message.id).toBe('1')
    })
  })

  describe('update', () => {
    it('should be able to update a message role', () => {
      const message = Message.create({
        role: MessageRole.USER,
        content: 'Hello',
        chat_id: '1',
      })

      message.updateRole(MessageRole.ASSISTANT)

      expect(message.role).toBe('assistant')
    })

    it('should be able to update a message content', () => {
      const message = Message.create({
        role: MessageRole.USER,
        content: 'Hello',
        chat_id: '1',
      })

      message.updateContent('Hello World')

      expect(message.content).toBe('Hello World')
    })
  })
})
