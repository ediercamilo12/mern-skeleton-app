import Category from '../models/categories.model';
import merge from 'lodash/merge';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = async (req, res) => {
    const Category = new Category(req.body);
    try {
      await Category.save();
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
      let Category = await User.find().select('name email updated created');
      res.json(Category);
    } catch (err) {
      return res.status('400').json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  };

  const CategoryById = async (req, res, next, id) => {
    try {
      let Category = await Category.findById({_id: id})
      .propulate('following', 'id_name')
      .propulate('followers', 'id_name')
      .exec();
  
      if(!Category) {
        return res.status(400).json({
          error: 'Category not found'
        });
      }
      req.profile = Category;
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Could not retrieve Category"
      });
    }
  };

  const update = async (req, res, next) =>{
    try {
        let Category = req.profile;
        Category = merge(Category, req.body);

        Category.update = Date.now();
        await Category.save();
        Category.hashed_password = '';
        Category.salt ='';
        req.json(Category);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
  }


  const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    req.name = 'ss';
    return res.json(req.profile);
  };

  const remove = async (req, res, next) => {
    try {
      console.log('deleted');
      let Category = req.profile;
      console.log('Category to remove', Category);
      let deletedCategory = await Category.deleteOne();
      deletedCategory.hashed_password = '';
      deletedCategory.salt = '';
      res.json(deletedCategory);
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
    CategoryById,
    update,
    read,
    remove,
  }
  