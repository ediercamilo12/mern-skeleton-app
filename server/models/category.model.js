import mongoose from "mongoose";

const CategoryShema = new mongoose.Schema([{
   name:{
    type: String,
    trim: true, 
    required: 'name is required'
   },

   description:{
    type: String,
    index: true,
    required: 'description is required',
    minlength: 10,
    maxlength: 250
   }
}]);

export default mongoose.model('Category', CategoryShema);