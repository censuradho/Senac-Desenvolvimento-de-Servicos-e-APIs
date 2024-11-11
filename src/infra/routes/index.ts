import { Router } from 'express';
import { healthCheckRouter } from './healthcheck.route';
import { authRoute } from './auth.route';
import { companyRoute } from './company.route';
import { reviewRoute } from './review.route';

const router = Router()

router.use(authRoute)
router.use(healthCheckRouter)
router.use(companyRoute)
router.use(reviewRoute)

export { router };
