import { Router } from 'express'
import { createMessage, listMessages } from '../controllers/contactController.js'
import { protect, admin } from '../middleware/auth.js'

const router = Router()

router.post('/', createMessage)
router.get('/', protect, admin, listMessages)

export default router
