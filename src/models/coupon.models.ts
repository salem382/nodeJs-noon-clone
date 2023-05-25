import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

interface coupon extends Document {
    code: string;
    discount:number;
    expire:Date;
}

const couponSchema: Schema<coupon> = new mongoose.Schema({

    code: {
       type:String,
       required:true,
       unique:true,
       trim:true
    },
    discount:{
        type:Number,
        required:true
    },
    expire:{
        type:Date,
        required:true
    }
}, {timestamps:true});


const couponModel: Model<coupon> = mongoose.model<coupon>('coup', couponSchema);

export default couponModel;