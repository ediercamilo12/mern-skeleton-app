import express from "express";
import postController from "../controllers/post.controller";
import authController from "../controllers/auth.controller";

const router = express.Router()

router.route('/api/post')
.get(postController.list)
.post(postController.create);

router.route('/api/users/follow')
  .put(authCtrl.requireSignin,
    userCtrl.addUser)

router.route('/api/post/:postById')
.get(authController.requireSignin, authController.read)
.post(authController.requireSignin, authController.hasAuthorization, authController.update)
.delete(authController.requireSignin, authController.hasAuthorization, authController.remove);


router.param('postById', postController.postById);


export default router;