
import bcrypt from 'bcrypt';

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
  passwordChangedAt:Date;
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
    passwordChangedAt:Date,
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


userSchema.pre('save', function() {
    this.password =  bcrypt.hashSync(this.password , 8);
})



const userModel: Model<user> = mongoose.model<user>('user', userSchema);

export default userModel;

