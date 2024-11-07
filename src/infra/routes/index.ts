import { Router } from 'express';
import { healthCheckRouter } from './healthcheck.route';
import { authRoute } from './auth.route';

const router = Router()

router.use(authRoute)
router.use(healthCheckRouter)

export { router };
