import express from 'express'
import * as userController from '../controllers/userController.js';


const router=express.Router()


router.route("/personal/register").post(userController.registerPersonelUser)
router.route("/company/register").post(userController.registerCompanyUser)

router.route("/login").post(userController.login)

router.route("/logout").post(userController.logout)

export default router   