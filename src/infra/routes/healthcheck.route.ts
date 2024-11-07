import { Response, Router, Request } from 'express';

const healthCheckRouter = Router()

healthCheckRouter.get(
  '/', 
  (req: Request, res: Response) => res.json({ ok: 'server is on' })
)

export { 
  healthCheckRouter
}