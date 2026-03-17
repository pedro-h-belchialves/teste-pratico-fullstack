import { buildApp } from './app'

async function start() {
  const app = buildApp()

  const port = Number(process.env.PORT) || 4000
  try {
    await app.listen({
      port: port,
      // host: '0.0.0.0',
    })

    console.log(`Server running on port ${port}`)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()
