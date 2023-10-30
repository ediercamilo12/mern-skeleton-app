import  express  from "express";
import commentControllers from "../controllers/comment.controllers";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.route('/api/comments')
  .get(commentControllers.list)
  .post(commentControllers.create);



router.route('/api/comments/addlike')
  .put(authController.requireSignin,
    commentControllers.addlike)

router.route('/api/comments/removelike')
    .put(authController.requireSignin,
    commentControllers.removelike)


router.route('/api/comments/:commentId')
.get(authController.requireSignin)
.put(authController.requireSignin, authController.hasAuthorization, commentControllers.update)
.delete(authController.requireSignin, authController.hasAuthorization, commentControllers.remove);
  

router.param('commentId', commentControllers.commentById);

export default router;