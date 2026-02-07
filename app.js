import express from 'express';
import route from './Routes/route.js';
import connectDb from './DB/db.js';


const DATABASEURL = process.env.DATABASEURL||'mongodb://localhost:27017'
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

//ejs setup

app.set('views', './Views')
app.set('view engine', 'ejs')


//db connection
connectDb(DATABASEURL);

app.use('/' , route);

app.listen(port, () => {
    console.log(`server is running:http://localhost${port}`)
})