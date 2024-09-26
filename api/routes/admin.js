import express from "express"; 
import { verifyToken} from '../utils/verifyAdmin.js'
import { adminlogin, adminHome ,addUser,adminLogout,userEdit,edituserData,deleteuser} from '../controllers/adminController.js'
const router = express.Router()

router.post('/login',adminlogin)
router.post('/logout',adminLogout)
router.get('/home',verifyToken, adminHome)
router.post('/addUser',verifyToken, addUser)
router.get('/edit/:id',edituserData)
router.post('/edit/:id',userEdit)
router.get('/deleteUser/:id',verifyToken, deleteuser)

export default router
