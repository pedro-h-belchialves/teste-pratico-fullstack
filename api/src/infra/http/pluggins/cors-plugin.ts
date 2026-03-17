import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'

// Este plugin configura o cores, como o ambiente é de produção ele aceita qualquer origem
async function staticPlugin(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
}

export const fastifyCorsPlugin = fp(staticPlugin)
