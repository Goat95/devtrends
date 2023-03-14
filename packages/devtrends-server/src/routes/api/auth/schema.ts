import { FastifySchema } from 'fastify'

const authResultSchema = {
  type: 'object',
  properties: {
    tokens: {
      type: 'object',
      properties: {
        accessToekn: { type: 'string' },
        refreshToekn: { type: 'string' },
      },
    },
    user: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
      },
    },
  },
}

const authBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
}

export const registerSchema: FastifySchema = {
  body: authBodySchema,
  response: {
    200: authResultSchema,
  },
}

export const loginSchema: FastifySchema = {
  body: authBodySchema,
  response: {
    200: authResultSchema,
  },
}
