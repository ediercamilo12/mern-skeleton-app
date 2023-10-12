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
    required: 'description is required'
   }
}])

export default mongoose.model('Category', CategoryShema);