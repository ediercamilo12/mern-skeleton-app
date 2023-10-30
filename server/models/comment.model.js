import mongoose from "mongoose";

const commentShema = new mongoose.Schema([{
    comment: {
        type: String,
        index: true,
        minlength: 1,
        maxlength: 250
    },

    created: {
        type: Date,
        default: Date.now
      },
      
      likes: [{type:mongoose.Schema.ObjectId,ref:'User'}],
      user: [{type:mongoose.Schema.ObjectId,ref:'User'}]

}]);

export default mongoose.model('Comment', commentShema);