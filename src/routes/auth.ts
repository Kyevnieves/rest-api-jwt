import {Router} from 'express'

const router: Router = Router()

import {TokenValidation} from '../libs/verifyToken'

import { signup, signin, profile } from '../controllers/auth.controllers'



router.post('/signup', signup)
router.post('/signin', signin)
// RUTA PROTEGIDA
router.get('/profile', TokenValidation, profile)

export default router