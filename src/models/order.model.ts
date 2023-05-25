import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

enum payment {
    cash = 'cash',
    card = 'card'
}

export interface order extends Document {
  user_id: Schema.Types.ObjectId;
  cart_items: {
    product_id: Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  total_order_price:number;
  shipping_address:object;
  payment_method:payment;
  isPaid:boolean;
  isDelevered:boolean;
  paidAt:Date;
  delivredAt:Date;
}

const orderSchema: Schema<order> = new mongoose.Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    cart_items:[
        {
            product_id:{type:Schema.Types.ObjectId, ref:"product"},
            quantity:{type:Number},
            price:{type:Number}
        }
    ],
    total_order_price:{type:Number},
    shipping_address:{
        street:String,
        city:String,
        phone:String
    },
    payment_method:{
        type:String,
        enum: Object.values(payment),
        default: payment.cash
    },
    isPaid:{type:Boolean, default:false},
    isDelevered:{type:Boolean, default:false},
    paidAt:Date,
    delivredAt:Date

}, {timestamps:true});



const orderModel: Model<order> = mongoose.model<order>('order', orderSchema);

export default orderModel;