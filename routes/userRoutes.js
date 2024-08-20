import { Router } from 'express';
import { createUser } from '../controllers/userController.js';
import { ValidateToken } from '../middlewares/validateToken.js';
const router = Router();

router.post('/create-user', createUser);
// router.post('/login', login);
// router.get('/get-current-user',  ValidateToken,getCurrentUser)
// router.get('/getAccountById/:id', findOne);
// router.put('/updateOne:id', update);
// router.delete('/deleteOne:id', deleteUser);

export default router;
