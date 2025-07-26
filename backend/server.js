// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Import the Supabase client
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ebxhdutszqfkfgkbflxn.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICEKEY
const supabase = createClient(supabaseUrl, supabaseServiceKey)
const port = process.env.PORT || 8000

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Projects
fastify.get('/projects', async function handler (request, reply) {
  let { data: projects, error } = await supabase
  .from('projects')
  .select('*')
  reply.send({ projects, error })
})

// Posts
fastify.get('/posts', async function handler (request, reply) {
  let { data: posts, error } = await supabase
  .from('posts')
  .select('*')
  reply.send({ posts, error })
})

// Run the server!
try {
 await fastify.listen({ port: port, host: '0.0.0.0' })
  console.log(`Server is running on port ${port}`)
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}