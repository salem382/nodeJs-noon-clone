import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

interface brand extends Document {
  name: string;
  logo:string;
  slug:string;
}

const brandSchema: Schema<brand> = new mongoose.Schema({

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
    logo:String
}, {timestamps:true});


brandSchema.post('init', (doc) => {
  doc.logo = 'http://localhost:5000/brand/' + doc.logo;
})



const brandModel: Model<brand> = mongoose.model<brand>('brand', brandSchema);

export default brandModel;