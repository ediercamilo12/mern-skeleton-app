import Comment from '../models/comment.model';
import merge from 'lodash/merge';
import errorHandler from '../helpers/dbErrorHandler';

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
      let comment = await Comment.find().select('name comment- updated created');
      res.json(comment);
    } catch (err) {
      return res.status('400').json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  };


  const commentById = async (req, res, next, id) => {
    try {
      let comment = await Comment.findById({_id: id})
      .propulate('like', 'id')
      .exec();
  
      if(!Comment) {
        return res.status(400).json({
          error: 'comment not found'
        });
      }
      req.profile = Comment;
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Could not retrieve comment"
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
  }


    const remove = async (req, res, next) => {
    try {
      console.log('deleted');
      let comment = req.profile;
      console.log('comment to remove', comment);
      let deletedComment = await comment.deleteOne();
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


    export default {
    create,
    list,
    commentById,
    update,
    remove,
  }