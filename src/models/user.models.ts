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
  wishlist:Array<Schema.Types.ObjectId>;
  adresses:object[];
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
    },
    wishlist:[{type:Schema.Types.ObjectId, ref:'product'}],
    adresses:[{
        city:String,
        street:String,
        phone:String
    }]
}, {timestamps:true});


userSchema.pre('save', function() {
    this.password =  bcrypt.hashSync(this.password , 8);
})

userSchema.post('init', (doc) => {
    doc.profilePic = 'http://localhost:5000/user/' + doc.profilePic;
})


const userModel: Model<user> = mongoose.model<user>('user', userSchema);

export default userModel;

