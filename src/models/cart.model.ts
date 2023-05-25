import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

export interface cart extends Document {
  user_id: Schema.Types.ObjectId;
  cart_items: {
    product_id: Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  total_price:number;
  tot_price_after_discount:number;
  discount:number;
}

const cartSchema: Schema<cart> = new mongoose.Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    cart_items:[
        {
            product_id:{type:Schema.Types.ObjectId, ref:"product"},
            quantity:{type:Number, default:1},
            price:{type:Number}
        }
    ],
    total_price:{type:Number},
    tot_price_after_discount:{type:Number},
    discount:{type:Number}

}, {timestamps:true});



const cartModel: Model<cart> = mongoose.model<cart>('cart', cartSchema);

export default cartModel;