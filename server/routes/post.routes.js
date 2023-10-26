import express from "express";
import postController from "../controllers/post.controller";
import authController from "../controllers/auth.controller";

const router = express.Router()

router.route('/api/posts')
.get(postController.list)
.post(postController.create);


router.route('/api/posts/:postById')
.get(authController.requireSignin)
.post(authController.requireSignin, authController.hasAuthorization, postController.update)
.delete(authController.requireSignin, authController.hasAuthorization, postController.remove);


router.param('postById', postController.postById);


export default router;