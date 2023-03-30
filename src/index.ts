import  express  from "express";
import { dbConnect } from "./config/config";



const app = express();

dbConnect();


app.get ('/', (req, res) => {

    return res.json('success');
})

app.listen('5000', () => console.log ('server is running'));