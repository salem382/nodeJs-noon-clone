import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

interface brand extends Document {
  name: string;
  logo:string;
}

const brandSchema: Schema<brand> = new mongoose.Schema({

    name:{
        type:String,
        unique:true,
        minlength:[2,'too short category name'],
        required:true,
        trim:true
    },
    logo:String
}, {timestamps:true});


const brandModel: Model<brand> = mongoose.model<brand>('brand', brandSchema);

export default brandModel;