import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

interface review extends Document {
  comment: string;
  user:Schema.Types.ObjectId;
  product:Schema.Types.ObjectId;
  rate:number;
}

const reviewSchema: Schema<review> = new mongoose.Schema({

    comment: {
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
    },
    rate:{
        type:Number,
        min:1,
        max:5
    }
}, {timestamps:true});

reviewSchema.pre(/^find/, function() {

    this.populate('user', 'name');
})

const reviewModel: Model<review> = mongoose.model<review>('review', reviewSchema);

export default reviewModel;