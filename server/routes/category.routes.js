import  express  from "express";
import categoryCtrl from '../controllers/category.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router()

router.route('/api/categories')
.get(categoryCtrl.list)
.post(categoryCtrl.create);

router.route('/api/categories/:categoryById')
.get(authCtrl.requireSignin, categoryCtrl.read)
.post(authCtrl.requireSignin, authCtrl.hasAuthorization, categoryCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, categoryCtrl.remove);


router.param('categoryById', categoryCtrl.categoryById);


export default router;