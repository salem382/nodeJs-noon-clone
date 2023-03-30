import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

interface subCategory extends Document {
  name: string;
  slug:string;
  categoryId:Schema.Types.ObjectId;
}

const subCategorySchema: Schema<subCategory> = new mongoose.Schema({
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
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    }
}, {timestamps:true});


const subCategoryModel: Model<subCategory> = mongoose.model<subCategory>('subCategory', subCategorySchema);

export default subCategoryModel;