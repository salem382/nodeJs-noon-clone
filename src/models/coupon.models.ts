import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

interface coupon extends Document {
  coupont: string;
  discount:number;
  expire:Date;
}

const couponSchema: Schema<coupon> = new mongoose.Schema({

    coupont: {
       type:String,
       trim:true,
       unique:true,
       required:[true, 'comment is required']
    },
    discount:{
        type:Number,
        min:0,
        required:[true, 'coupon discount is required']
    },
    expire:{
        type:Date,
        required:[true, 'coupon date is required']
    }
}, {timestamps:true});


const couponModel: Model<coupon> = mongoose.model<coupon>('coupon', couponSchema);

export default couponModel;