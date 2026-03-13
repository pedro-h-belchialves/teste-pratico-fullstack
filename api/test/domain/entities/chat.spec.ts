import { describe, expect, it } from 'vitest'

import { Chat } from '../../../src/domain/entities/chat/chat'
import { Message } from '../../../src/domain/entities/chat/message'
import { MessageRole } from '../../../src/domain/entities/chat/message-role'

describe('Chat', () => {
  describe('create', () => {
    it('should be able to create a chat without id', () => {
      const chat = Chat.create({
        messages: [],
        title: 'Test Chat',
        user_id: '1',
      })

      expect(chat).toBeTruthy()
      expect(chat.id).toBeTruthy()
      expect(chat.title).toBe('Test Chat')
      expect(chat.user_id).toBe('1')
    })

    it('should be able to create a chat with id', () => {
      const chat = Chat.create({
        id: '1',
        messages: [],
        title: 'Test Chat',
        user_id: '1',
      })

      expect(chat.id).toBe('1')
    })

    it('should be able to create chat with messages', () => {
      const messages = []

      for (let i = 0; i < 5; i++) {
        const message = Message.create({
          role: i % 2 === 0 ? MessageRole.USER : MessageRole.ASSISTANT,
          content: 'Hello',
          chat_id: '1',
        })

        messages.push(message)
      }

      const chat = Chat.create({
        messages,
        title: 'Test Chat',
        user_id: '1',
      })

      expect(chat.messages).toHaveLength(5)
    })
  })

  describe('update', () => {
    it('should be able to update a chat title', () => {
      const chat = Chat.create({
        messages: [],
        title: 'Test Chat',
        user_id: '1',
      })

      chat.updateTitle('New Title')

      expect(chat.title).toBe('New Title')
    })

    it('should be able to add a message to a chat', () => {
      const chat = Chat.create({
        messages: [],
        title: 'Test Chat',
        user_id: '1',
      })

      const message = Message.create({
        role: MessageRole.USER,
        content: 'Hello',
        chat_id: '1',
      })

      chat.addMessage(message)

      expect(chat.messages).toHaveLength(1)
    })

    it('should be able to remove a message from a chat', () => {
      const chat = Chat.create({
        messages: [
          Message.create({
            role: MessageRole.USER,
            content: 'Hello',
            chat_id: '1',
          }),
        ],
        title: 'Test Chat',
        user_id: '1',
      })

      chat.removeMessage(chat.messages[0])

      expect(chat.messages).toHaveLength(0)
    })
  })
})
