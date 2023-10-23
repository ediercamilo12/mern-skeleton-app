import mongoose from "mongoose";

const CommentShema = new mongoose.Schema([{
    description:{
        type: String,
        index: true,
        required: 'description is required',
        minlength: 1,
        maxlength: 250
       }
}]);

export default mongoose.model('Comment', CommentShema);