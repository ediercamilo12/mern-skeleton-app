import Comment from "../models/comment.model";
import merge from "lodash/merge";
import errorHandler from "../helpers/dbErrorHandler";

const create = async (req, res) => {
    const comment = new Comment(req.body);
    try {
      await comment.save();
      return res.status(200).json({
        message: 'Successfully signed up!'
      });
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };


  const list = async (req, res) => {
    try {
      let comments = await Comment.find().select('name email updated created');
      res.json(comments);
    } catch (err) {
      return res.status('400').json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  };


  const commentById = async (req, res, next, id) => {
    try {
      let comment = await comment.findById({_id: id})
      .propulate('like', 'id')
      .exec();
  
      if(!Comment) {
        return res.status(400).json({
          error: 'Post not found'
        });
      }
      req.profile = comment;
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Could not retrieve post"
      });
    }
  };


  const update = async (req, res, next) =>{
    try {
        let comment = req.profile;
        comment = merge(comment, req.body);

        comment.update = Date.now();
        await comment.save();
        comment.hashed_password = '';
        comment.salt ='';
        req.json(comment);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
  };

  const remove = async (req, res, next) => {
    try {
      console.log('deleted');
      let comment = req.profile;
      console.log('comment to remove', comment);
      let deletedComment = await category.deleteOne();
      deletedComment.hashed_password = '';
      deletedComment.salt = '';
      res.json(deletedComment);
    } catch(err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };



  const addlike = async (req, res) => {
    try {
      const {
        userId, postId 
      } = red.body
      const result = await post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage()
      });
    }
  };
  
  const removelike = async (req, res, next) => {
    try {
      const {
        userId, postId 
      } = red.body
      const result = await post.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage()
      });
    }
  };

  export default {
    create,
    update,
    list,
    remove,
    commentById,
    addlike,
    removelike,
  }
