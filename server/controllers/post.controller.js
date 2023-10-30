import Post from "../models/post.model";
import merge from 'lodash/merge';
import errorHandler from "../helpers/dbErrorHandler";

const create = async (req, res) => {
    const post = new Post(req.body);
    try {
      await post.save();
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
      let posts = await Post.find().select('name email updated created');
      res.json(posts);
    } catch (err) {
      return res.status('400').json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  };

  const postById = async (req, res, next, id) => {
    try {
      let post = await post.findById({_id: id})
      .propulate('like', 'id')
      .propulate('comment', 'id_title')
      .exec();
  
      if(!Post) {
        return res.status(400).json({
          error: 'Post not found'
        });
      }
      req.profile = Post;
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Could not retrieve post"
      });
    }
  };

  const addUser = async (req, res) => {
    try {
      const result = await User.findByIdAndUpdate(
        req.body.followId,
        {$push : {followers: req.body.userId}},
        {new:true}
      )
      .populate('user', '_id title')
      .exec();
      result.hashed_password = undefined;
      result.salt = undefined;
      res.json(result);
    } catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };


  const update = async (req, res, next) =>{
    try {
        let post = req.profile;
        post = merge(post, req.body);

        post.update = Date.now();
        await post.save();
        post.hashed_password = '';
        post.salt ='';
        req.json(post);
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
      let post = req.profile;
      console.log('post to remove', post);
      let deletedPost = await category.deleteOne();
      deletedPost.hashed_password = '';
      deletedPost.salt = '';
      res.json(deletedPost);
    } catch(err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };

  export default {
    create,
    update,
    remove,
    list,
    postById,
    addUser
  };
