import mongoose from "mongoose";

const PostShema = new mongoose.Schema([{
    title:{
        type: String,
        trim: true,
        required: 'title is required'
    },

    photo: {
        data: Buffer,
        contentType: String
      },

    comments: {
        type: String,
        index: true,
        minlength: 1,
        maxlength: 250
      },

    user: {
        type:mongoose.Schema.ObjectId,
        ref: user,
        required: 'user required'
    },

    created: {
        type: Date,
        default: Date.now
      },
    
    user: [{type:mongoose.Schema.ObjectId,ref:'User'}]

}]);

export default mongoose.model('Post', PostShema);
