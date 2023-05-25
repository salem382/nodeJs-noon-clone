import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';


export interface product extends Document {
  title: string;
  slug:string;
  price:number;
  priceAfterDiscount:number;
  ratingAvg:number;
  ratingCount:number;
  description:string;
  quantity:number;
  sold:number;
  imgCover:string;
  images:Array<string>;  
  category:Schema.Types.ObjectId;
  subCategoty:Schema.Types.ObjectId;
  brand: Schema.Types.ObjectId;
}

const productSchema: Schema<product> = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        minlength:[2,'too short category name'],
        required:true,
        trim:true
    },
    slug : {
        type:String,
        lowercase:true,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        min:0
    },
    ratingAvg:{
        type:Number,
        min:[1, 'reating avg must be greater than 1'],
        max:[5, 'rating avg must be less than 5']
    },
    ratingCount:{
        type:Number,
        default:0,
        min:0
    },
    description:{
        type:String,
        minlength:[5,'too short desc name'],
        maxlength:[300,'desc must be less than 300 chracter'],
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        default:0,
        min:0,
        required:[true, 'quzntity is required']
    },
    sold:{
       type:Number,
       default:0,
       min:0
    },
    imgCover:String,
    images:[String],
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:[true, 'category is required']
    },
    subCategoty:{
        type:Schema.Types.ObjectId,
        ref:'subCategory',
        required:[true, 'sub Category is required']
    },
    brand: {
        type:Schema.Types.ObjectId,
        ref:'brand',
        required:[true, 'brand is required']
    }
}, {timestamps:true, toJSON:{virtuals:true}, toObject:{virtuals:true}});


productSchema.post('init', (doc) => {
    doc.imgCover = 'http://localhost:5000/product/' + doc.imgCover;
    doc.images = doc.images.map(obj => 'http://localhost:5000/product/' + obj)
})

productSchema.virtual('myReviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product'
})
productSchema.pre(/^find/, function() {

    this.populate('myReviews');
});

const productModel: Model<product> = mongoose.model<product>('product', productSchema);

export default productModel;