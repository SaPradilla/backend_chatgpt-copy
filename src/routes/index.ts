import { Router } from "express";
import AuthRoute from './authRoutes';

const router = Router()

router.use('/user',AuthRoute)

export default router;