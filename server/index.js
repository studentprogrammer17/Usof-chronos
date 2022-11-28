import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"
import routes from './router/routes.js'
import path  from 'path'

const app = express();
const port = process.env.PORT || 8080;

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/api", routes);

app.use('/avatars', express.static(`${path.resolve()}/assets/avatars`));

app.listen(port, () => {
    console.log(`listening http://localhost:${port}/`);
});

