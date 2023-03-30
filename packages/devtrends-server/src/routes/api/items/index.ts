import { FastifyPluginAsync } from 'fastify'
import requireAuthPlugin, {
  createAuthorizedRoute,
} from '../../../plugins/requireAuthPlugin'
import ItemService from '../../../services/ItemService'
import { WriteItemRoute, writeItemSchema } from './schema'

export const itemsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.register(authorizedItemRoute)
  fastify.get('/', async () => {
    return 'Hola'
  })
}

const authorizedItemRoute = createAuthorizedRoute(async (fastify) => {
  const itemService = ItemService.getInstance()
  fastify.post<WriteItemRoute>(
    '/',
    { schema: writeItemSchema },
    async (request) => {
      const item = await itemService.createItem(request.user!.id, request.body)
      return item
    },
  )
})
