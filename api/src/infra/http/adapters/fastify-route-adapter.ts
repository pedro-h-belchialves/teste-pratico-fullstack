import { FastifyReply, FastifyRequest } from 'fastify'
import { IHttpRequest } from '../contracts/http-request-contract'
import { IHttpResponse } from '../contracts/http-response-contract'

interface Controller {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>
}

export function fastifyRouteAdapter(controller: Controller) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: IHttpRequest = {
      params: request.params,
      body: request.body,
      query: request.query,
      headers: request.headers,
      user: (request as any).user,
    }

    const httpResponse = await controller.handle(httpRequest)

    return reply.status(httpResponse.statusCode).send(httpResponse.body)
  }
}
