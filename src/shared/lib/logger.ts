import pino from 'pino'
import pinoHttp from 'pino-http'
import pretty from 'pino-pretty'

export const logger = pino(
  pretty({
    colorize: true,
  })
)

export const loggerHttp = pinoHttp({
  logger
})