import { describe, expect, it } from 'vitest'

import { SystemPrompt } from '../../../src/domain/entities/system-prompt/system-prompt'

describe('SystemPrompt', () => {
  describe('create', () => {
    it('should be able to create a system prompt without id', () => {
      const systemPrompt = SystemPrompt.create({
        content: 'Hello',
      })

      expect(systemPrompt).toBeTruthy()
      expect(systemPrompt.id).toBeDefined()
      expect(systemPrompt.content).toBe('Hello')
    })

    it('should be able to create a system prompt with id', () => {
      const systemPrompt = SystemPrompt.create({
        id: '1',
        content: 'Hello',
      })

      expect(systemPrompt.id).toBe('1')
    })
  })

  describe('update', () => {
    it('should be able to update a system prompt content', () => {
      const systemPrompt = SystemPrompt.create({
        content: 'Hello',
      })

      systemPrompt.updateContent('Hello World')

      expect(systemPrompt.content).toBe('Hello World')
    })
  })
})
