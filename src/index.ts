import  express  from "express";
import { dbConnect } from "./config/config";
import { init } from "./allRoutes";
import cors from "cors";

const app = express();

dbConnect();

app.use(cors())
app.use(express.static('uploads/'))
app.use(express.json());

init(app);

app.listen(5000, () => console.log ('server is running'));