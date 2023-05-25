import mongoose from "mongoose";

export const dbConnect = () => {

    mongoose.connect('mongodb+srv://Ahmed:Salem@cluster0.iqymeb8.mongodb.net/Ecommerce-noon-clone')
    .then(() =>  console.log ("database is connected"))
    .catch(() => console.log ("error in database"));
}