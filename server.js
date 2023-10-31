const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require("./routes/routes_user");
const app = express();
const {PORT} = process.env;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/",userRoute);


app.listen(process.env.PORT,()=>{
    console.log('http://localhost:'+PORT);
});