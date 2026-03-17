import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import jwt from '@fastify/jwt'

async function jwtPlugin(app: FastifyInstance) {
  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'secret',
  })
}

export const fastifyJwtPlugin = fp(jwtPlugin)
