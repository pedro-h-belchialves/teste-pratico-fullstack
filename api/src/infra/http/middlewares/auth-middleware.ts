import { FastifyReply, FastifyRequest } from 'fastify'

import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import jwt from '@fastify/jwt'

async function jwtPlugin(app: FastifyInstance) {
  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'secret',
  })
}

export const fastifyJwtPlugin = fp(jwtPlugin)

export async function jwtValidator(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({
      message: 'Unauthorized',
    })
  }
}
