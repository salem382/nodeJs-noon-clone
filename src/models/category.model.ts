import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

interface category extends Document {
  name: string;
  slug:string;
  img:string;
}

const categorySchema: Schema<category> = new mongoose.Schema({

    name:{
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
    img:String
}, {timestamps:true});


const categoryModel: Model<category> = mongoose.model<category>('Category', categorySchema);

export default categoryModel;