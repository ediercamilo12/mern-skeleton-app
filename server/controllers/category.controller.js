import Category from '../models/category.model';
import merge from 'lodash/merge';
import errorHandler from '../helpers/dbErrorHandler';


const create = async (req, res) => {
    const category = new Category(req.body);
    try {
      await category.save();
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
      let category = await Category.find().select('name email updated created');
      res.json(category);
    } catch (err) {
      return res.status('400').json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  };


  

  const categoryById = async (req, res, next, id) => {
    try {
      let category = await Category.findById({_id: id})
      .propulate('following', 'id_name')
      .propulate('followers', 'id_name')
      .exec();
  
      if(!category) {
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
        let category = req.profile;
        category = merge(category, req.body);

        category.update = Date.now();
        await category.save();
        category.hashed_password = '';
        category.salt ='';
        req.json(category);
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
      let category = req.profile;
      console.log('category to remove', category);
      let deletedCategory = await category.deleteOne();
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
    categoryById,
    update,
    read,
    remove,
  }
  