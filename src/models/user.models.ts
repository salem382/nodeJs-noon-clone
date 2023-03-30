import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

enum roleStatus {
    customer = 'customer',
    admin = 'admin'
}
  
interface user extends Document {
  name: string;
  email:string;
  password:string;
  profilePic:string;
  role:roleStatus;
  isActive:Boolean;
  verified:Boolean;
}

const userSchema: Schema<user> = new mongoose.Schema({

    name:{
        type:String,
        minlength:[2,'too short category name'],
        required:true,
        trim:true
    },
    email : {
        type:String,
        unique:true,
        minlength:[2,'too short category name'],
        required:true,
        trim:true
    },
    password: {
        type:String,
        minlength:[2,'too short category name'],
        required:true,
    },
    profilePic:String,
    role:{
        type:String,
        enum: Object.values(roleStatus),
        default: roleStatus.customer
    },
    isActive:{
        type:Boolean,
        default:true
    },
    verified:{
        type:Boolean,
        default:false
    }
}, {timestamps:true});


const userModel: Model<user> = mongoose.model<user>('user', userSchema);

export default userModel;