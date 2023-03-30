import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

interface review extends Document {
  comments: string;
  user:Schema.Types.ObjectId;
  product:Schema.Types.ObjectId;
}

const reviewSchema: Schema<review> = new mongoose.Schema({

    comments: {
       type:String,
       trim:true,
       required:[true, 'comment is required']
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',
    }
}, {timestamps:true});


const reviewModel: Model<review> = mongoose.model<review>('review', reviewSchema);

export default reviewModel;